import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'ram-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [
    ButtonModule
  ],
  providers: [
    DialogService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  body = 'Are you sure?';
  confirmButtonLabel = 'OK';
  cancelButtonLabel = 'Cancel';

  constructor(
    private config: DynamicDialogConfig,
    public dlgRef: DynamicDialogRef
  ) {
    this.body = this.config.data?.body || this.body;
    this.confirmButtonLabel = this.config.data?.confirmButtonLabel || this.confirmButtonLabel;
    this.cancelButtonLabel = this.config.data?.cancelButtonLabel || this.cancelButtonLabel;
  }
}
