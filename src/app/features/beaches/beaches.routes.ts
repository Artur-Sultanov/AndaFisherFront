import { Routes } from '@angular/router';

export const beachesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/beach-list/beach-list.component').then(
        (m) => m.BeachListComponent
      ),
    pathMatch: 'full',
    data: { public: true },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/beach-detail/beach-detail.component').then(
        (m) => m.BeachDetailComponent
      ),
    data: { public: true },
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
  {
    path: 'map',
    loadComponent: () =>
      import('./pages/beach-map/beach-map.component').then(
        (m) => m.BeachMapComponent
      ),
    data: { public: true },
  },
];
