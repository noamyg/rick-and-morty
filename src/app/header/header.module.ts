import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

const declarations = [
  HeaderComponent
];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class HeaderModule {}
