import { Component } from '@angular/core';
import { AppState } from '../state/app/app.state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from './model/character.model';
import { selectCharacters } from '../state/characters/characters.selector';
import { skipInitial } from '../shared/utils/rxjs.util';

@Component({
  selector: 'ram-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage {
  characters$: Observable<Character[] | undefined> = this.store.pipe(select(selectCharacters), skipInitial());
  
  constructor(
    private store: Store<AppState>
  ) {
  }
  
}
