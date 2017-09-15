import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RoutingModule } from './home.routing';
import { ToolbarModule } from 'modules/toolbar';
import { WorkshopComponent } from '../workshop/workshop.component';
import { SearchComponent } from '../search/search.component';
import {
  MdTabsModule,
  MdCardModule,
  MdButtonModule,
} from '@angular/material';

@NgModule({
  declarations: [
    HomePageComponent,
    WorkshopComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    ToolbarModule,
    MdTabsModule,
    MdCardModule,
    MdButtonModule,
  ],
})
export class HomeModule { }
