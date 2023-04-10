import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './state/app/app.state';
import { GetCharacters } from './state/characters/characters.actions';
import { Observable, first } from 'rxjs';
import { CallState, ProcessState } from './state/state.model';
import { selectCharacters, selectCharactersCallState } from './state/characters/characters.selector';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { skipInitial } from './shared/utils/rxjs.util';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'ram-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  ProcessState = ProcessState;
  charactersCallState$: Observable<CallState> = this.store.pipe(select(selectCharactersCallState), untilDestroyed(this));

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.router.navigate(['/']);
    this.bootstrapCharacters();
  }

  bootstrapCharacters(): void {
    this.store.dispatch(new GetCharacters());
    this.store.pipe(select(selectCharacters), skipInitial(), first()).subscribe(() => {
      this.router.navigate(['characters']);
    })
  }
}
