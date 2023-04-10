import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersPage } from './characters.page';
import { RouterModule } from '@angular/router';
import { characterRoutes } from './characters.routes';

@NgModule({
  declarations: [CharactersPage],
  imports: [
    CommonModule,
    RouterModule.forChild(characterRoutes),
  ],
})
export class CharactersModule {}
