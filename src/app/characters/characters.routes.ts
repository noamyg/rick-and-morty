import { Route } from '@angular/router';
import { CharactersPage } from 'src/app/characters/characters.page';

export const characterRoutes: Route[] = [
  {
    path: '',
    component: CharactersPage
  }
];
