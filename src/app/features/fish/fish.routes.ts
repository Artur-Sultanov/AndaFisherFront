import { Routes } from '@angular/router';

export const fishRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/fish-list/fish-list.component').then(
        (m) => m.FishListComponent
      ),
    pathMatch: 'full',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/fish-detail/fish-detail.component').then(
        (m) => m.FishDetailComponent
      ),
  },
];
