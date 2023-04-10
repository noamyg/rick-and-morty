import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { concatMap, filter, retryWhen, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app/app.state';
import { Authenticate } from 'src/app/state/identity/identity.actions';
import { selectAuthCallState } from 'src/app/state/identity/identity.selector';
import { ProcessState, ServiceError } from 'src/app/model';

interface StatusCodeRetryStrategy {
  statusCode: HttpStatusCode;
  retryCount: number;
  shouldReautheticate: boolean;
}

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
  private readonly statusCodeRetryStrategy: StatusCodeRetryStrategy[] = [
    { statusCode: HttpStatusCode.Unauthorized, retryCount: 3, shouldReautheticate: true }
  ];

  constructor(
    private store: Store<AppState>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(request).pipe(
      retryWhen(errors => {
        let count = 0;
        return errors.pipe(
          concatMap(async (error) => {
            const strategy = this.statusCodeRetryStrategy.find(st => st.statusCode === error.status);
            if (error instanceof HttpErrorResponse && strategy) {
              if (++count <= strategy.retryCount) {
                /*
                 * If error is from Authentication method itself - prevent recursive retry.
                 * The source request itself is for authentication, no need to manually dispatch it
                 */
                if (!request.url.includes('/identity/authenticate') && strategy.shouldReautheticate) {
                  this.store.dispatch(new Authenticate());
                  await firstValueFrom(this.store.pipe(
                    select(selectAuthCallState),
                    filter(state => state !== ProcessState.PROCESSING),
                    take(1)));
                }
                return of(error);
              }
            }
            const parsedError: ServiceError = error.error || {
              errors: [],
              status: error.status,
              title: error.statusText,
              type: error.name,
              traceId: null
            };
            throw Object.assign(new Error(parsedError.title), parsedError);
          })
        );
      })
    );
  }
}
