/* eslint-disable @typescript-eslint/no-shadow */
import { Action } from '@ngrx/store';
import { Character } from 'src/app/characters/model/character.model';

export enum ECharactersActions {
  GetCharacters = '[Characters] Get Characters',
  GetCharactersSuccess = '[Characters] Get Characters Success',
  GetCharactersFailure = '[Characters] Get Characters Failure',
  AddCharacter = '[Characters] Add Character',
  AddCharacterSuccess = '[Characters] Add Character Success',
  AddCharacterFailure = '[Characters] Add Character Failure',
  UpdateCharacter = '[Characters] Update Character',
  UpdateCharacterSuccess = '[Characters] Update Character Success',
  UpdateCharacterFailure = '[Characters] Update Character Failure',
  DeleteCharacter = '[Characters] Delete Character',
  DeleteCharacterSuccess = '[Characters] Delete Character Success',
  DeleteCharacterFailure = '[Characters] Delete Character Failure',
  AddToFavorites = '[Characters] Add To Favorites',
  AddToFavoritesSuccess = '[Characters] Add To Favorites Success',
  RemoveFromFavorites = '[Characters] Remove From Favorites',
  RemoveFromFavoritesSuccess = '[Characters] Remove From Favorites Success',
}

export class GetCharacters implements Action {
  public readonly type = ECharactersActions.GetCharacters;
}

export class GetCharactersSuccess implements Action {
  public readonly type = ECharactersActions.GetCharactersSuccess;
  constructor(public payload: Character[]) {}
}

export class GetCharactersFailure implements Action {
  public readonly type = ECharactersActions.GetCharactersFailure;
  constructor(public payload: string) {}
}

export class AddCharacter implements Action {
  public readonly type = ECharactersActions.AddCharacter;
  constructor(public payload: Character) {}
}

export class AddCharacterSuccess implements Action {
  public readonly type = ECharactersActions.AddCharacterSuccess;
  constructor(public payload: Character) {}
}

export class AddCharacterFailure implements Action {
  public readonly type = ECharactersActions.AddCharacterFailure;
  constructor(public payload: string) {}
}

export class UpdateCharacter implements Action {
  public readonly type = ECharactersActions.UpdateCharacter;
  constructor(public payload: Character) {}
}

export class UpdateCharacterSuccess implements Action {
  public readonly type = ECharactersActions.UpdateCharacterSuccess;
  constructor(public payload: Character) {}
}

export class UpdateCharacterFailure implements Action {
  public readonly type = ECharactersActions.UpdateCharacterFailure;
  constructor(public payload: string) {}
}

export class DeleteCharacter implements Action {
  public readonly type = ECharactersActions.DeleteCharacter;
  constructor(public payload: number) {}
}

export class DeleteCharacterSuccess implements Action {
  public readonly type = ECharactersActions.DeleteCharacterSuccess;
  constructor(public payload: number) {}
}

export class DeleteCharacterFailure implements Action {
  public readonly type = ECharactersActions.DeleteCharacterFailure;
  constructor(public payload: string) {}
}

export class AddToFavorites implements Action {
  public readonly type = ECharactersActions.AddToFavorites;
  constructor(public payload: number) {}
}

export class AddToFavoritesSuccess implements Action {
  public readonly type = ECharactersActions.AddToFavoritesSuccess;
  constructor(public payload: number) {}
}

export class RemoveFromFavorites implements Action {
  public readonly type = ECharactersActions.RemoveFromFavorites;
  constructor(public payload: number) {}
}

export class RemoveFromFavoritesSuccess implements Action {
  public readonly type = ECharactersActions.RemoveFromFavoritesSuccess;
  constructor(public payload: number) {}
}

export type CharactersActions =
    GetCharacters | GetCharactersSuccess | GetCharactersFailure |
    AddCharacter | AddCharacterSuccess |
    UpdateCharacterSuccess | UpdateCharacterSuccess |
    DeleteCharacterSuccess | DeleteCharacterSuccess |
    AddToFavorites | AddToFavoritesSuccess |
    RemoveFromFavorites | RemoveFromFavoritesSuccess;
