import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CustomValidationError } from 'src/app/shared/model/custom-validation-error';
import { FormUtil } from 'src/app/shared/utils/form.util';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  selector: 'ram-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
  @Input() id: string = uuidv4();
  @Input() label!: string;
  @Input() labelIcon?: string;
  @Input() labelIconTooltip?: string;
  @Input() type?: string = 'text';
  @Input() placeholder?: string = '';
  @Input() disabled?: boolean = false;
  @Input() control!: FormControl;
  @Input() autocomplete?: string;
  @Input() customValidationErrors!: CustomValidationError[];
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Output() labelIconClick: EventEmitter<void> = new EventEmitter();
  FormUtil = FormUtil;

  ngOnInit(): void {
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(val => this.valueChange.emit(val));
  }

}
