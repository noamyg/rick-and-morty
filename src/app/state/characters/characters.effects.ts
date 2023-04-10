import { Injectable } from "@angular/core";
import {  ofType, Actions, createEffect } from "@ngrx/effects"
import { concatMap, delay, map, switchMap } from "rxjs/operators"
import { of, withLatestFrom } from "rxjs";
import { CharactersApiService } from "src/app/services/characters-api.service";
import { GetCharacters, GetCharactersSuccess, UpdateCharacter, AddCharacter, AddCharacterSuccess, DeleteCharacter, ECharactersActions, UpdateCharacterSuccess, DeleteCharacterSuccess } from "./characters.actions";
import { Character } from "src/app/characters/model/character.model";
import { Store, select } from "@ngrx/store";
import { AppState } from "../app/app.state";
import { selectCharacters } from "./characters.selector";

@Injectable()
export class CharactersEffects {
    getCharacters$ = createEffect(() => this.actions.pipe(
        ofType<GetCharacters>(ECharactersActions.GetCharacters),
        concatMap(() => of('dummy loader').pipe(delay(1500))),
        switchMap(() => {
            return this.charactersService.getCharacters();
        }),
        map((data: Character[]) => {
            return new GetCharactersSuccess(data);
        })
    ));

    updateCharacter$ = createEffect(() => this.actions.pipe(
        ofType<UpdateCharacter>(ECharactersActions.UpdateCharacter),
        map(action => action.payload),
        switchMap(async (character) => {
            // There would be an API call here
            return character;
        }),
        map((character: Character) => {
            return new UpdateCharacterSuccess(character);
        })
    ));

    addCharacter$ = createEffect(() => this.actions.pipe(
        ofType<AddCharacter>(ECharactersActions.AddCharacter),
        map(action => action.payload),
        switchMap(async (character) => {
            // There would be an API call here. Instead - an ID will be generated based on the max current id
            return character;
        }),
        withLatestFrom(
            this.store.pipe(
                select(selectCharacters),
                map(characters => characters ? Math.max(...characters.map(c => c.id)) : 1)
            )
        ),
        map(([character, maxId]) => {
            return new AddCharacterSuccess({
                ...character,
                id: ++maxId
            });
        })
    ));

    deleteCharacter$ = createEffect(() => this.actions.pipe(
        ofType<DeleteCharacter>(ECharactersActions.DeleteCharacter),
        map(action => action.payload),
        switchMap(async (id) => {
            // There would be an API call here
            return id;
        }),
        map((id: number) => {
            return new DeleteCharacterSuccess(id);
        })
    ));

    constructor(
        private store: Store<AppState>,
        private actions: Actions,
        private charactersService: CharactersApiService
    ) {}    
}