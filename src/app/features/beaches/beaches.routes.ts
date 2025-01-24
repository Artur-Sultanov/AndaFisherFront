import { Routes } from '@angular/router';

export const beachesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/beach-list/beach-list.component').then(
        (m) => m.BeachListComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/beach-detail/beach-detail.component').then(
        (m) => m.BeachDetailComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/add-beach/add-beach.component').then(
        (m) => m.AddBeachComponent
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/edit-beach/edit-beach.component').then(
        (m) => m.EditBeachComponent
      ),
  },
];
