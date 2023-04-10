import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersPage } from './characters.page';
import { RouterModule } from '@angular/router';
import { characterRoutes } from './characters.routes';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CharactersPage,
    CharacterCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(characterRoutes),
    CardModule
  ],
})
export class CharactersModule {}
