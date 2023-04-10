import { Injectable } from "@angular/core";
import {  ofType, Actions, createEffect } from "@ngrx/effects"
import { map, switchMap } from "rxjs/operators"
import { of } from "rxjs";
import { CharactersApiService } from "src/app/services/characters-api.service";
import { GetCharacters, GetCharactersSuccess, UpdateCharacter, AddCharacter, AddCharacterSuccess, DeleteCharacter, ECharactersActions, UpdateCharacterSuccess, DeleteCharacterSuccess } from "./characters.actions";
import { Character } from "src/app/characters/model/character.model";

@Injectable()
export class CharactersEffects {
    getCharacters$ = createEffect(() => this.actions.pipe(
        ofType<GetCharacters>(ECharactersActions.GetCharacters),
        switchMap(() => {
            return this.charactersService.getCharacters();
        }),
        switchMap((data: Character[]) => {
            return of(new GetCharactersSuccess(data));
        })
    ));

    updateCharacter$ = createEffect(() => this.actions.pipe(
        ofType<UpdateCharacter>(ECharactersActions.UpdateCharacter),
        map(action => action.payload),
        switchMap(async (character) => {
            // There would be an API call here
            return character;
        }),
        switchMap((category: Character) => {
            return of(new UpdateCharacterSuccess(category));
        })
    ));

    addCharacter$ = createEffect(() => this.actions.pipe(
        ofType<AddCharacter>(ECharactersActions.AddCharacter),
        map(action => action.payload),
        switchMap(async (character) => {
            // There would be an API call here
            return character;
        }),
        switchMap((character: Character) => {
            return of(new AddCharacterSuccess(character));
        })
    ));

    deleteCharacter$ = createEffect(() => this.actions.pipe(
        ofType<DeleteCharacter>(ECharactersActions.DeleteCharacter),
        map(action => action.payload),
        switchMap(async (id) => {
            // There would be an API call here
            return id;
        }),
        switchMap((id: number) => {
            return of(new DeleteCharacterSuccess(id));
        })
    ));

    constructor(
        private actions: Actions,
        private charactersService: CharactersApiService
    ) {}    
}