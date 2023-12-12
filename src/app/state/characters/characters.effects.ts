import { Injectable } from '@angular/core';
import {  ofType, Actions, createEffect } from '@ngrx/effects';
import { concatMap, delay, map, catchError, switchMap, tap } from 'rxjs/operators';
import { of, withLatestFrom } from 'rxjs';
import { CharactersApiService } from 'src/app/services/characters-api.service';
import * as fromCharacters from './characters.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app/app.state';
import { selectCharacters, selectFavoriteCharacterIds } from './characters.selector';
import { LocalStorageKeys } from '@rick-and-morty/libs/utils';
import { cloneDeep } from 'lodash';
import { GetCharactersFailure } from './characters.actions';

@Injectable()
export class CharactersEffects {
  getCharacters$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.GetCharacters>(fromCharacters.ECharactersActions.GetCharacters),
    concatMap(() => of('dummy loader').pipe(delay(2000))),
    switchMap(() => this.charactersService.getCharacters().pipe(
      map(data => new fromCharacters.GetCharactersSuccess(data)),
      catchError(error => of(new GetCharactersFailure(error?.message ?? 'error'))),
    ))
  ));

  updateCharacter$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.UpdateCharacter>(fromCharacters.ECharactersActions.UpdateCharacter),
    map(action => action.payload),
    concatMap(character => of(character).pipe( //In real life - there would be an api call here, returning the updated resource
      map(data => new fromCharacters.UpdateCharacterSuccess(data)),
      catchError(error => of(new fromCharacters.UpdateCharacterFailure(error?.message ?? 'error'))),
    ))
  ));

  addCharacter$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.AddCharacter>(fromCharacters.ECharactersActions.AddCharacter),
    map(action => action.payload),
    switchMap(character => of(character).pipe( //In real life - there would be an api call here, returning the id of the created resource
    withLatestFrom(
      this.store.pipe(
        select(selectCharacters),
        map(characters => characters ? Math.max(...characters.map(c => c.id)) : 1)
      )
    ),
      map(([character, maxId]) => new fromCharacters.AddCharacterSuccess({
        ...character,
        id: ++maxId
      })),
      catchError(error => of(new fromCharacters.AddCharacterFailure(error?.message ?? 'error'))),
    ))
  ));

  deleteCharacter$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.DeleteCharacter>(fromCharacters.ECharactersActions.DeleteCharacter),
    map(action => action.payload),
    switchMap(character => of(character).pipe( //In real life - there would be an api call here, returning "OK"
      map(data => new fromCharacters.DeleteCharacterSuccess(data)),
      catchError(error => of(new fromCharacters.DeleteCharacterFailure(error?.message ?? 'error'))),
    ))
  ));

  addToFavorites$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.AddToFavorites>(fromCharacters.ECharactersActions.AddToFavorites),
    map(action => action.payload),
    switchMap(characterId => of(characterId).pipe(
      withLatestFrom(
        this.store.pipe(
          select(selectFavoriteCharacterIds)
        )
      ),
      tap(([characterId, favoriteCharacterIds]) => {
        const updatedFavorites = [ ...cloneDeep(favoriteCharacterIds) || [], characterId ];
        localStorage.setItem(LocalStorageKeys.FAVORITE_CHARACTERS, updatedFavorites.join(','));
        return characterId;
      }),
      map(([characterId]) => new fromCharacters.AddToFavoritesSuccess(characterId))
    ))
  ));

  removeFromFavorites$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.RemoveFromFavorites>(fromCharacters.ECharactersActions.RemoveFromFavorites),
    map(action => action.payload),
    switchMap(characterId => of(characterId).pipe(
      withLatestFrom(
        this.store.pipe(
          select(selectFavoriteCharacterIds)
        )
      ),
      tap(([characterId, favoriteCharacterIds]) => {
        const ind = favoriteCharacterIds?.findIndex(id => id === characterId) ?? -1;
        const updatedFavorites = cloneDeep(favoriteCharacterIds || []);
        if (ind !== -1) {
          updatedFavorites.splice(ind, 1);
        }
        localStorage.setItem(LocalStorageKeys.FAVORITE_CHARACTERS, updatedFavorites.join(','));
      }),
      map(([characterId]) => new fromCharacters.RemoveFromFavoritesSuccess(characterId))
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private charactersService: CharactersApiService
  ) {}
}
