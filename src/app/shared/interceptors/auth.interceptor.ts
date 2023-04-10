import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app/app.state';
import { selectAuthToken } from 'src/app/state/identity/identity.selector';
import { first, mergeMap, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly nonTokenRoutes: string[] = [
    '/identity/authenticate',
    '/identity/token/refresh',
    '/identity/token/revoke'
  ];

  constructor(
    private store: Store<AppState>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeaders = request.headers || new HttpHeaders();
    return this.store.pipe(select(selectAuthToken), first(), mergeMap(authToken => {
      const isAuthenticated = !!authToken;
      if (isAuthenticated && !this.nonTokenRoutes.find(url => request.url.includes(url))) {
        headers = headers.append('authorization', `Bearer ${authToken.accessToken}`);
      }
      request = request.clone({ headers, withCredentials: true });
      return next.handle(request);
    }));
  }
}
