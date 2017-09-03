import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RoutingModule } from './home.routing';
import { ToolbarModule } from 'modules/toolbar';
import { WorkshopComponent } from '../workshop/workshop.component';

@NgModule({
  declarations: [
    HomePageComponent,
    WorkshopComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    ToolbarModule,
  ],
})
export class HomeModule { }
