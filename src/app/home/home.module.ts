import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RoutingModule } from './home.routing';

export { HomePageComponent } from './home-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
  ]
})
export class HomeModule { }

