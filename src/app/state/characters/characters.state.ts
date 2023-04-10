import { Character } from 'src/app/characters/model/character.model';
import { CallState, ProcessState } from '../state.model';

export interface CharactersState {
  characters?: Character[];
  charactersCallState: CallState;
  favoriteCharacters?: Character[];
}

export const initialCharactersState: CharactersState = {
  characters: undefined,
  charactersCallState: ProcessState.INIT,
  favoriteCharacters: undefined
};
