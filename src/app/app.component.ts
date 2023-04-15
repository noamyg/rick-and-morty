import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './state/app/app.state';
import { GetCharacters } from './state/characters/characters.actions';
import { Observable, tap } from 'rxjs';
import { CallState, ProcessState } from './state/state.model';
import { selectCharactersCallState } from './state/characters/characters.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'ram-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  ProcessState = ProcessState;
  charactersCallState$?: Observable<CallState>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.router.navigate(['/'], { replaceUrl: true });
    this.bootstrapCharacters();
  }

  bootstrapCharacters(): void {
    this.store.dispatch(new GetCharacters());
    this.charactersCallState$ = this.store.pipe(select(selectCharactersCallState), tap(
      val => {
        if (val === ProcessState.COMPLETED) {
          this.router.navigate(['/characters'], { replaceUrl: true });
        }
      }
    ));
  }
}
