import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'ram-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
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
