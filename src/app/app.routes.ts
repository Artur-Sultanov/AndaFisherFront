import { RouterModule, Routes } from '@angular/router';
import { BeachDetailComponent } from './components/pages/beach-detail/beach-detail.component';
import { BeachListComponent } from './components/pages/beach-list/beach-list.component';
import { FishDetailComponent } from './components/pages/fish-detail/fish-detail.component';
import { FishListComponent } from './components/pages/fish-list/fish-list.component';
import { NgModule } from '@angular/core';
import { HarmonyHavenComponent } from './components/pages/harmony-haven/harmony-haven.component';

export const routes: Routes = [
  {
    path: 'beach-detail/:id',
    component: BeachDetailComponent,
  },
  {
    path: 'beach-list',
    component: BeachListComponent,
  },
  { path: '', redirectTo: '/beach-list', pathMatch: 'full' },
  {
    path: 'fish-detail/:id',
    component: FishDetailComponent,
  },
  {
    path: 'fish-list',
    component: FishListComponent,
  },
  {
    path: 'harmony-haven',
    component: HarmonyHavenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
