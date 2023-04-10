import { Injectable } from '@angular/core';
import {  ofType, Actions, createEffect } from '@ngrx/effects';
import { concatMap, delay, map, switchMap } from 'rxjs/operators';
import { of, withLatestFrom } from 'rxjs';
import { CharactersApiService } from 'src/app/services/characters-api.service';
import * as fromCharacters from './characters.actions';
import { Character } from 'src/app/characters/model/character.model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app/app.state';
import { selectCharacters, selectFavoriteCharacterIds } from './characters.selector';
import { LocalStorageKeys } from 'src/app/shared/utils/storage.util';
import { cloneDeep } from 'lodash';

@Injectable()
export class CharactersEffects {
  getCharacters$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.GetCharacters>(fromCharacters.ECharactersActions.GetCharacters),
    concatMap(() => of('dummy loader').pipe(delay(2000))),
    switchMap(() => this.charactersService.getCharacters()),
    map((data: Character[]) => new fromCharacters.GetCharactersSuccess(data))
  ));

  updateCharacter$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.UpdateCharacter>(fromCharacters.ECharactersActions.UpdateCharacter),
    map(action => action.payload),
    switchMap(async (character) =>
    // There would be an API call here
      character
    ),
    map((character: Character) => new fromCharacters.UpdateCharacterSuccess(character))
  ));

  addCharacter$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.AddCharacter>(fromCharacters.ECharactersActions.AddCharacter),
    map(action => action.payload),
    switchMap(async (character) =>
    // There would be an API call here. Instead - an ID will be generated based on the max current id
      character
    ),
    withLatestFrom(
      this.store.pipe(
        select(selectCharacters),
        map(characters => characters ? Math.max(...characters.map(c => c.id)) : 1)
      )
    ),
    map(([character, maxId]) => new fromCharacters.AddCharacterSuccess({
      ...character,
      id: ++maxId
    }))
  ));

  deleteCharacter$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.DeleteCharacter>(fromCharacters.ECharactersActions.DeleteCharacter),
    map(action => action.payload),
    switchMap(async (id) =>
    // There would be an API call here
      id
    ),
    map((id: number) => new fromCharacters.DeleteCharacterSuccess(id))
  ));

  addToFavorites$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.AddToFavorites>(fromCharacters.ECharactersActions.AddToFavorites),
    map(action => action.payload),
    withLatestFrom(
      this.store.pipe(
        select(selectFavoriteCharacterIds)
      )
    ),
    map(([characterId, favoriteCharacterIds]) => {
      const updatedFavorites = [ ...cloneDeep(favoriteCharacterIds) || [], characterId ];
      localStorage.setItem(LocalStorageKeys.FAVORITE_CHARACTERS, updatedFavorites.join(','));
      return characterId;
    }),
    map((character) => new fromCharacters.AddToFavoritesSuccess(character))
  ));

  removeFromFavorites$ = createEffect(() => this.actions.pipe(
    ofType<fromCharacters.RemoveFromFavorites>(fromCharacters.ECharactersActions.RemoveFromFavorites),
    map(action => action.payload),
    withLatestFrom(
      this.store.pipe(
        select(selectFavoriteCharacterIds)
      )
    ),
    map(([characterId, favoriteCharacterIds]) => {
      const ind = favoriteCharacterIds?.findIndex(id => id === characterId) ?? -1;
      const updatedFavorites = cloneDeep(favoriteCharacterIds || []);
      if (ind !== -1) {
        updatedFavorites.splice(ind, 1);
      }
      localStorage.setItem(LocalStorageKeys.FAVORITE_CHARACTERS, updatedFavorites.join(','));
      return characterId;
    }),
    map((character) => new fromCharacters.RemoveFromFavoritesSuccess(character))
  ));

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private charactersService: CharactersApiService
  ) {}
}
