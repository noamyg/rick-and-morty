import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Character, CharacterStatus } from '../../model/character.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app/app.state';
import { DeleteCharacter, UpdateCharacter } from 'src/app/state/characters/characters.actions';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confrim-dialog/confirm-dialog.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { skipWhile } from 'rxjs';
import { CharacterFormDlgComponent } from '../character-form-dlg/character-form-dlg.component';
import { DialogUtil } from 'src/app/shared/utils/dialog.util';

@UntilDestroy()
@Component({
  selector: 'ram-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterCardComponent {
  @Input() character!: Character;
  CharacterStatus = CharacterStatus;

  constructor(
    private dlgService: DialogService,
    private store: Store<AppState>
  ) { }

  async deleteCharacter(): Promise<void> {
    const dialog = this.dlgService.open(ConfirmDialogComponent, {
      data: {
        body: 'Are you sure you want to delete this character?'
      }
    });
    dialog.onClose.pipe(skipWhile(data => !data), untilDestroyed(this)).subscribe(async () => {
      this.store.dispatch(new DeleteCharacter(this.character.id));
    });
  }

  openCharacterDialog(): void {
    const dialog = this.dlgService.open(CharacterFormDlgComponent, {
      ...DialogUtil.DEFAULT_OPTIONS,
      data: {
        character: this.character
      }
    });
    dialog.onClose.pipe(skipWhile(data => !data), untilDestroyed(this)).subscribe(async (data: Character) => {
      this.store.dispatch(new UpdateCharacter(data));
    });
  }

}
