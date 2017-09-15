import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { WorkshopComponent } from '../workshop/workshop.component';
import { SearchComponent } from '../search/search.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'workshop' },
      { path: 'workshop', component: WorkshopComponent },
      { path: 'search', component: SearchComponent },
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
