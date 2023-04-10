import { RouterReducerState } from '@ngrx/router-store';
import { CharactersState, initialCharactersState } from '../characters/characters.state';

export interface AppState {
  router?: RouterReducerState;
  characters: CharactersState;
}

export const initialAppState: AppState = {
  characters: initialCharactersState
};

export const getInitialState = (): AppState => initialAppState;
