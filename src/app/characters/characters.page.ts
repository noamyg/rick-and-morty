import { Component } from '@angular/core';
import { AppState } from '../state/app/app.state';
import { Store, select } from '@ngrx/store';
import { Observable, skipWhile } from 'rxjs';
import { Character } from './model/character.model';
import { selectCharacters } from '../state/characters/characters.selector';
import { skipInitial } from '../shared/utils/rxjs.util';
import { CharacterFormDlgComponent } from './components/character-form-dlg/character-form-dlg.component';
import { DialogService } from 'primeng/dynamicdialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AddCharacter } from '../state/characters/characters.actions';
import { DialogUtil } from '../shared/utils/dialog.util';

@UntilDestroy()
@Component({
  selector: 'ram-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage {
  characters$: Observable<Character[] | undefined> = this.store.pipe(select(selectCharacters), skipInitial());
  
  constructor(
    private dlgService: DialogService,
    private store: Store<AppState>
  ) { }

  openCharacterFormDialog(): void {
    const dialog = this.dlgService.open(CharacterFormDlgComponent, {
      ...DialogUtil.DEFAULT_OPTIONS
    });
    dialog.onClose.pipe(skipWhile(data => !data), untilDestroyed(this)).subscribe(async (data: Character) => {
      this.store.dispatch(new AddCharacter(data));
    });
  }
  
}
