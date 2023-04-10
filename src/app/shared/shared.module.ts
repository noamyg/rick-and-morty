import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownComponent, InputComponent } from './components/controls';
import { IndicationTextComponent } from './components/indication-text/indication-text.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
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
  DynamicDialogModule,
  ConfirmDialogModule,
  DialogModule,
  ToastModule,
  DropdownModule,
  ButtonModule,
  RippleModule,
  MessagesModule,
  MessageModule
];

@NgModule({
  declarations,
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
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
