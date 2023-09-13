import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersPage } from './characters.page';
import { RouterModule } from '@angular/router';
import { characterRoutes } from './characters.routes';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CardModule } from 'primeng/card';
import { CharacterFormDlgComponent } from './components/character-form-dlg/character-form-dlg.component';
import { DropdownComponent, InputComponent } from '@rick-and-morty/libs/shared-ui';
import { ButtonModule } from 'primeng/button'
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    CharactersPage,
    CharacterCardComponent,
    CharacterFormDlgComponent,
  ],
  imports: [
    CommonModule,
    DropdownComponent,
    InputComponent,
    ButtonModule,
    RouterModule.forChild(characterRoutes),
    CardModule,
  ],
  providers: [
    DialogService
  ]
})
export class CharactersModule {}
