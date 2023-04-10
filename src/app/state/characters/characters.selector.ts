import { createSelector } from '@ngrx/store';
import { AppState } from '../app/app.state';
import { CharactersState } from './characters.state';

const charactersSelect = (state: AppState): CharactersState => state.characters;

export const selectCharacters = createSelector(
  charactersSelect,
  (state: CharactersState) => state.characters
);

export const selectCharactersCallState = createSelector(
  charactersSelect,
  (state: CharactersState) => state.charactersCallState
);

export const selectFavoriteCharacters = createSelector(
  charactersSelect,
  (state: CharactersState) => state.favoriteCharacters
);
