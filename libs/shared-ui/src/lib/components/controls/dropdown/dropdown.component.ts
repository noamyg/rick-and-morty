import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { CustomValidationError, FormUtil } from '@rick-and-morty/libs/utils';
import { v4 as uuidv4 } from 'uuid';
import { SelectOption, SelectOptionsFactory } from '../../../model/select-option.model';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { IndicationTextComponent } from '../../indication-text/indication-text.component';

@UntilDestroy()
@Component({
  selector: 'ram-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    IndicationTextComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit, AfterViewInit {
  @Input() id: string = uuidv4();
  @Input() label?: string;
  @Input() control!: FormControl;
  @Input() showClear?: boolean = true;
  @Input() disabled?: boolean;
  @Input() customValidationErrors!: CustomValidationError[];
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('dropdown', { static: false }) dropdown!: Dropdown;
  FormUtil = FormUtil;
  _options!: SelectOption[];

  get options(): SelectOption[] {
    return this._options;
  }

  @Input() set options(options: SelectOption[]) {
    this._options = SelectOptionsFactory.createFromArray(options as []);
    if (this.control && this.dropdown) {
      this.shake(this.options.find(opt => opt.id === this.control.value));
    }
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(val => this.valueChange.emit(val));
  }

  ngAfterViewInit(): void {
    if (this.options) {
      this.shake(this.options.find(opt => opt.id === this.control.value));
    }
  }

  private shake(selectedOption: SelectOption | undefined): void {
    this.dropdown.selectedOption = selectedOption;
  }

}
