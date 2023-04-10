/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-var */
import { ProcessState } from '../state.model';
import { CharactersActions, ECharactersActions } from './characters.actions';
import { CharactersState, initialCharactersState } from './characters.state';
import { cloneDeep } from 'lodash';

export function charactersReducers(state = initialCharactersState, action: CharactersActions): CharactersState {
  let stateCharacters = [];
  let stateFavoriteCharacterIds = [];
  switch (action.type) {
    case ECharactersActions.GetCharacters:
      return {
        ...state,
        charactersCallState: ProcessState.PROCESSING
      };
    case ECharactersActions.GetCharactersSuccess:
      return {
        ...state,
        characters: action.payload,
        charactersCallState: ProcessState.COMPLETED
      };
    case ECharactersActions.GetCharactersFailure:
      return {
        ...state,
        characters: [],
        charactersCallState: { errorMsg: action.payload }
      };
    case ECharactersActions.UpdateCharacterSuccess:
      stateCharacters = cloneDeep(state.characters) || [];
      stateCharacters[stateCharacters.findIndex(c => c.id === action.payload.id)] = action.payload;
      return {
        ...state,
        characters: stateCharacters
      };
    case ECharactersActions.AddCharacterSuccess:
      stateCharacters = cloneDeep(state.characters) || [];
      stateCharacters.push(action.payload);
      return {
        ...state,
        characters: stateCharacters
      };
    case ECharactersActions.DeleteCharacterSuccess:
      stateCharacters = cloneDeep(state.characters) || [];
      stateCharacters.splice(stateCharacters.findIndex(c => c.id === action.payload), 1);
      return {
        ...state,
        characters: stateCharacters
      };
    case ECharactersActions.AddToFavoritesSuccess:
      stateFavoriteCharacterIds = cloneDeep(state.favoriteCharacterIds) || [];
      stateFavoriteCharacterIds.push(action.payload);
      return {
        ...state,
        favoriteCharacterIds: stateFavoriteCharacterIds
      };
    case ECharactersActions.RemoveFromFavoritesSuccess:
      stateFavoriteCharacterIds = cloneDeep(state.favoriteCharacterIds) || [];
      var ind = stateFavoriteCharacterIds.findIndex(fc => fc === action.payload);
      if (ind > -1) {
        stateFavoriteCharacterIds.splice(ind, 1);
      }
      return {
        ...state,
        favoriteCharacterIds: stateFavoriteCharacterIds
      };
    default:
      return state;
  }
}
