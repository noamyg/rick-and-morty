import { Component, Input } from '@angular/core';

@Component({
  selector: 'ram-indication-text',
  templateUrl: './indication-text.component.html',
  styleUrls: ['./indication-text.component.scss']
})
export class IndicationTextComponent {
  @Input() indication: 'success' | 'warning' | 'danger' | 'info' = 'info';
  @Input() customIcon?: string;
  @Input() bold?: string = '';
  @Input() regular?: string = '';

  get icon(): string {
    if (this.customIcon) {
      return this.customIcon;
    }
    switch (this.indication) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'arrow-circle-left';
      case 'danger':
        return 'close-circle';
      default:
        return 'info-circle';
    }
  }
}
