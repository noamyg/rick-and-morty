import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppState } from '../state/app/app.state';
import { Store, select } from '@ngrx/store';
import { Observable, skipWhile } from 'rxjs';
import { Character } from './model/character.model';
import { selectCharacters, selectFavoriteCharacterIds } from '../state/characters/characters.selector';
import { CharacterFormDlgComponent } from './components/character-form-dlg/character-form-dlg.component';
import { DialogService } from 'primeng/dynamicdialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AddCharacter } from '../state/characters/characters.actions';
import { DialogUtil, skipInitial } from '@rick-and-morty/libs/utils';

@UntilDestroy()
@Component({
  selector: 'ram-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersPage {
  characters$: Observable<Character[] | undefined> = this.store.pipe(select(selectCharacters), skipInitial());
  favoriteCharacterIds$: Observable<number[] | undefined> = this.store.pipe(select(selectFavoriteCharacterIds), skipInitial());
  showOnlyFavorites: boolean = false;

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
