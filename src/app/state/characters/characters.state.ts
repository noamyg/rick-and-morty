import { Character } from 'src/app/characters/model/character.model';
import { CallState, ProcessState } from '../state.model';
import { LocalStorageKeys } from '@rick-and-morty/libs/utils';

export interface CharactersState {
  characters?: Character[];
  charactersCallState: CallState;
  favoriteCharacterIds?: number[];
}

export const initialCharactersState: CharactersState = {
  characters: undefined,
  charactersCallState: ProcessState.INIT,
  favoriteCharacterIds: localStorage.getItem(LocalStorageKeys.FAVORITE_CHARACTERS)?.split(',').map(id => Number(id))
};
