import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'beaches',
    pathMatch: 'full',
  },
  {
    path: 'beaches',
    loadChildren: () =>
      import('./features/beaches/beaches.routes').then((m) => m.beachesRoutes),
  },
  {
    path: 'fish',
    loadChildren: () =>
      import('./features/fish/fish.routes').then((m) => m.fishRoutes),
  },
];
