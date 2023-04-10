import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character, PaginatedResult } from '../characters/model/character.model';
import { map, Observable } from 'rxjs';

export const CHARACTERS_API_BASE_URL = new InjectionToken<string>('CHARACTERS_API_BASE_URL');

@Injectable({
  providedIn: 'root',
})
export class CharactersApiService {

  constructor(
    private http: HttpClient,
    @Inject(CHARACTERS_API_BASE_URL) private baseUrl: string
  ) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<PaginatedResult<Character>>(`${this.baseUrl}/api/character`)
      .pipe(
        map(response => response.results)
      );
  }
}
