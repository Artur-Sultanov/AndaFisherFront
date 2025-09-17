import { Routes } from '@angular/router';
import { BeachMapComponent } from './features/beaches/pages/beach-map/beach-map.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: BeachMapComponent, pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'beaches',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./features/beaches/beaches.routes').then((m) => m.beachesRoutes),
  },
  {
    path: 'fish',
    loadChildren: () =>
      import('./features/fish/fish.routes').then((m) => m.fishRoutes),
  },
  {
    path: 'map',
    loadComponent: () =>
      import('./features/beaches/pages/beach-map/beach-map.component').then(
        (m) => m.BeachMapComponent
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
