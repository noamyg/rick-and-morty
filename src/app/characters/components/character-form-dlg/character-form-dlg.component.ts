import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption, SelectOptionsFactory } from 'src/app/shared/model/select-option.model';
import { Character, CharacterStatus } from '../../model/character.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'ram-character-form-dlg',
  templateUrl: './character-form-dlg.component.html',
  styleUrls: ['./character-form-dlg.component.scss'],
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
      Object.values(CharacterStatus).map(st => {
        return {
          name: st,
          id: st
        }
      }));
  }
  
  initForm(): void {
    this.formGroup = this.formBuilder.group<Partial<Character>>({
      image: '',
      name: '',
      species: '',
      status: CharacterStatus.ALIVE
    })
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
