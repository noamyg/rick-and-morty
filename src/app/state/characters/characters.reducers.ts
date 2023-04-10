/* eslint-disable no-var */
import { CharactersActions, ECharactersActions } from "./characters.actions";
import { CharactersState, initialCharactersState } from "./characters.state";
import { cloneDeep } from 'lodash';

export function charactersReducers(state = initialCharactersState, action: CharactersActions): CharactersState {
    switch (action.type) {
        case ECharactersActions.GetCharactersSuccess:
            return {
                ...state,
                characters: action.payload
            }
        case ECharactersActions.UpdateCharacterSuccess:
            var stateCharacters = cloneDeep(state.characters);
            stateCharacters[stateCharacters.findIndex(c => c.id === action.payload.id)] = action.payload;
            return {
                ...state,
                characters: stateCharacters
            }
        case ECharactersActions.AddCharacterSuccess:
            var stateCharacters = cloneDeep(state.characters);
            stateCharacters.push(action.payload);
            return {
                ...state,
                characters: stateCharacters
            }
        case ECharactersActions.DeleteCharacterSuccess:
            var stateCharacters = cloneDeep(state.characters);
            stateCharacters.splice(stateCharacters.findIndex(c => c.id === action.payload), 1);
            return {
                ...state,
                characters: stateCharacters
            }
        case ECharactersActions.AddToFavorites:
            var stateFavoriteCharacters = cloneDeep(state.favoriteCharacters);
            stateFavoriteCharacters.push(action.payload);
            return {
                ...state,
                favoriteCharacters: stateFavoriteCharacters
            }
        case ECharactersActions.RemoveFromFavorites:
            var stateFavoriteCharacters = cloneDeep(state.favoriteCharacters);
            var ind = stateFavoriteCharacters.findIndex(fc => fc.id === action.payload.id);
            if (ind > -1) {
                stateFavoriteCharacters.splice(ind, 1);
            }
            return {
                ...state,
                favoriteCharacters: stateFavoriteCharacters
            }
        default:
            return state;
    }
};
