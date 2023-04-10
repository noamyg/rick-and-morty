import { Component, Input } from '@angular/core';
import { Character, CharacterStatus } from '../../model/character.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app/app.state';
import { DeleteCharacter } from 'src/app/state/characters/characters.actions';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confrim-dialog/confirm-dialog.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { skipWhile } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ram-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent {
  CharacterStatus = CharacterStatus;
  @Input() character!: Character;

  constructor(
    private dlgService: DialogService,
    private store: Store<AppState>
  ) { }

  async deleteCharacter(): Promise<void> {
    const dialog = this.dlgService.open(ConfirmDialogComponent, {
      width: '20%',
      data: {
        body: 'Are you sure you want to delete this character?'
      }
    });
    dialog.onClose.pipe(skipWhile(data => !data), untilDestroyed(this)).subscribe(async () => {
      this.store.dispatch(new DeleteCharacter(this.character.id));
    });
  }

  openCharacterDialog(): void {
  }

}
