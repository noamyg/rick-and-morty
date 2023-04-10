import { Action } from "@ngrx/store";
import { Character } from "src/app/characters/model/character.model";

export enum ECharactersActions {
    GetCharacters = '[Characters] Get Characters',
    GetCharactersSuccess = '[Characters] Get Characters Success',
    GetCharactersFailure = '[Characters] Get Characters Failure',
    AddCharacter = '[Characters] Update Character',
    AddCharacterSuccess = '[Characters] Add Character Success',
    UpdateCharacter = '[Characters] Update Character',
    UpdateCharacterSuccess = '[Characters] Update Character Success',
    DeleteCharacter = '[Characters] Delete Character',
    DeleteCharacterSuccess = '[Characters] Delete Character Success',
    AddToFavorites = '[Characters] Add To Favorites',
    RemoveFromFavorites= '[Characters] Remove From Favorites',
}

export class GetCharacters implements Action {
    public readonly type = ECharactersActions.GetCharacters;
}

export class GetCharactersSuccess implements Action {
    public readonly type = ECharactersActions.GetCharactersSuccess;
    constructor(public payload: Character[]){}
}

export class GetCharactersFailure implements Action {
    public readonly type = ECharactersActions.GetCharactersFailure;
    constructor(public payload: string) {}
}

export class AddCharacter implements Action {
    public readonly type = ECharactersActions.AddCharacter;
    constructor(public payload: Character){}
}

export class AddCharacterSuccess implements Action {
    public readonly type = ECharactersActions.AddCharacterSuccess;
    constructor(public payload: Character){}
}

export class UpdateCharacter implements Action {
    public readonly type = ECharactersActions.UpdateCharacter;
    constructor(public payload: Character){}
}

export class UpdateCharacterSuccess implements Action {
    public readonly type = ECharactersActions.UpdateCharacterSuccess;
    constructor(public payload: Character){}
}

export class DeleteCharacter implements Action {
    public readonly type = ECharactersActions.DeleteCharacter;
    constructor(public payload: number){}
}

export class DeleteCharacterSuccess implements Action {
    public readonly type = ECharactersActions.DeleteCharacterSuccess;
    constructor(public payload: number){}
}

export class AddToFavorites implements Action {
    public readonly type = ECharactersActions.AddToFavorites;
    constructor(public payload: Character){}
}

export class RemoveFromFavorites implements Action {
    public readonly type = ECharactersActions.RemoveFromFavorites;
    constructor(public payload: Character){}
}

export type CharactersActions = 
    GetCharacters | GetCharactersSuccess | GetCharactersFailure |
    AddCharacter | AddCharacterSuccess |
    UpdateCharacterSuccess | UpdateCharacterSuccess |
    DeleteCharacterSuccess | DeleteCharacterSuccess |
    AddToFavorites | RemoveFromFavorites