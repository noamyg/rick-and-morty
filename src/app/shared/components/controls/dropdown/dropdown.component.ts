import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Dropdown } from 'primeng/dropdown';
import { CustomValidationError } from 'src/app/shared/model/custom-validation-error';
import { SelectOption, SelectOptionsFactory } from 'src/app/shared/model/select-option.model';
import { FormUtil } from 'src/app/shared/utils/form.util';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  selector: 'ram-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
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
