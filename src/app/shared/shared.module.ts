import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { DropdownComponent, InputComponent } from './components/controls';
import { IndicationTextComponent } from './components/indication-text/indication-text.component';
import { LoaderComponent } from './components/loader/loader.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogComponent } from './components/confrim-dialog/confirm-dialog.component';

const declarations = [
  DropdownComponent,
  InputComponent,
  IndicationTextComponent,
  LoaderComponent,
  ConfirmDialogComponent
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
