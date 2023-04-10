import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app/app.state';
import { GetCharacters } from './state/characters/characters.actions';

@Component({
  selector: 'ram-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private store: Store<AppState>
  ) {
    this.bootstrapCharacters();
  }

  bootstrapCharacters(): void {
    this.store.dispatch(new GetCharacters());
  }
}
