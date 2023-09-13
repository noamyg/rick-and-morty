import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CustomValidationError, FormUtil } from '@rick-and-morty/libs/utils';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { IndicationTextComponent } from '../../indication-text/indication-text.component';

@UntilDestroy()
@Component({
  selector: 'ram-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [
    InputTextModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IndicationTextComponent,
  ],
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
