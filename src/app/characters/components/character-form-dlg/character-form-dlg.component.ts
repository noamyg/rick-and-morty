import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Character, CharacterStatus } from '../../model/character.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectOption, SelectOptionsFactory } from '@rick-and-morty/libs/shared-ui';

@Component({
  selector: 'ram-character-form-dlg',
  templateUrl: './character-form-dlg.component.html',
  styleUrls: ['./character-form-dlg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterFormDlgComponent implements OnInit {
  formGroup!: FormGroup;
  statusOptions!: SelectOption[];
  character: Character;

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    public dlgRef: DynamicDialogRef
  ) {
    this.character = this.config.data?.character;
  }

  ngOnInit(): void {
    this.initOptions();
    this.initForm();
    if (this.character) {
      this.patchForm();
    }
  }

  initOptions(): void {
    this.statusOptions = SelectOptionsFactory.createFromArray(
      Object.values(CharacterStatus).map(st => ({
        name: st,
        id: st
      })));
  }

  initForm(): void {
    this.formGroup = this.formBuilder.group<Partial<Character>>({
      image: '',
      name: '',
      species: '',
      status: CharacterStatus.ALIVE
    });

    /*
     * By seperating the form creation from the validation assignment,
     * we can leverage the typed form in order to ensure that the model of the form
     * is identical to the model of the requst
     */

    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.get(key)?.setValidators(Validators.required);
    });
  }

  patchForm(): void {
    this.formGroup.patchValue(this.character);
  }

  save(): void {
    this.dlgRef.close({
      ...this.character,
      ...this.formGroup.value
    });
  }
}
