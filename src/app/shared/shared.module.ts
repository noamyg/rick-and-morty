import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownComponent, InputComponent } from './components/controls';
import { IndicationTextComponent } from './components/indication-text/indication-text.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogComponent } from './components/confrim-dialog/confirm-dialog.component';
import { PluckPipe } from './pipes/pluck,pipe';

const declarations = [
  DropdownComponent,
  InputComponent,
  IndicationTextComponent,
  LoaderComponent,
  ConfirmDialogComponent,
  PluckPipe
];

const imports = [
  InputTextModule
];

const sharedModules = [
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule,
  DialogModule,
  ToastModule,
  DropdownModule,
  ButtonModule,
  RippleModule
];

@NgModule({
  declarations,
  providers: [
    DialogService,
    ConfirmationService
  ],
  imports: [
    ...imports,
    ...sharedModules,
  ],
  exports: [
    ...sharedModules,
    ...declarations
  ],
})
export class SharedModule {}
