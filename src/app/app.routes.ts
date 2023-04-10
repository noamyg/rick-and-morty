import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
      path: 'characters',
      loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule)
    },
];
