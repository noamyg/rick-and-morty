import { state } from "@angular/animations";
import { createSelector } from "@ngrx/store";
import { AppState } from "../app/app.state";
import { CharactersState } from "./characters.state";

const selectCharacters = (state: AppState) => state.charts

export const selectChartsCategories = createSelector(
    selectCharacters,
    (state: CharactersState) => state.chartsCategories
)

export const selectSelectedChartsCategory = createSelector(
    selectCharacters,
    (state: CharactersState) => state.selectedChartsCategory
)

export const selectFavoriteCharts = createSelector(
    selectCharacters,
    (state: CharactersState) => state.favoriteCharts
)