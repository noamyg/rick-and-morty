import { Character } from "src/app/characters/model/character.model";

export interface CharactersState {
    characters: Character[];
    favoriteCharacters: Character[];
}

export const initialCharactersState: CharactersState = {
    characters: [],
    favoriteCharacters: []
};