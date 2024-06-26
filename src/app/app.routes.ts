import { RouterModule, Routes } from '@angular/router';
import { BeachDetailComponent } from './components/pages/beach-detail/beach-detail.component';
import { BeachListComponent } from './components/pages/beach-list/beach-list.component';
import { FishDetailComponent } from './components/pages/fish-detail/fish-detail.component';
import { FishListComponent } from './components/pages/fish-list/fish-list.component';
import { NgModule } from '@angular/core';
import { HarmonyHavenComponent } from './components/pages/harmony-haven/harmony-haven.component';
import { AddBeachComponent } from './components/pages/add-beach/add-beach.component';
import { EditBeachComponent } from './components/pages/edit-beach/edit-beach.component';
import { DeleteBeachComponent } from './components/pages/delete-beach/delete-beach.component';
import { AddFishToBeachComponent } from './components/pages/add-fish-to-beach/add-fish-to-beach.component';
import { AddFishToBeachListComponent } from './components/pages/add-fish-to-beach-list/add-fish-to-beach-list.component';

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
  {
    path: 'add-beach',
    component: AddBeachComponent,
  },
  {
    path: 'edit-beach',
    component: EditBeachComponent,
  },
  {
    path: 'delete-beach',
    component: DeleteBeachComponent,
  },
  {
    path: 'add-fish-to-beach/:id',
    component: AddFishToBeachComponent,
  },
  {
    path: 'add-fish-to-beach-list/:id',
    component: AddFishToBeachListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
