import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopComponent } from './workshop.component';
import { DraftsComponent } from './drafts/drafts.component';
import { SharedComponent } from './shared/shared.component';

const routes: Routes = [
  {
    path: '',
    component: WorkshopComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'drafts' },
      { path: 'drafts', component: DraftsComponent },
      { path: 'shared', component: SharedComponent },
      { path: 'saved', component: DraftsComponent },
    ]
  },
];

const HomeRoutes: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [HomeRoutes],
  exports: [RouterModule],
  providers: [],
})
export class RoutingModule { }
