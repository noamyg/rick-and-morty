import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { charactersReducers } from '../characters/characters.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  characters: charactersReducers
};
