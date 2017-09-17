import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdTabsModule,
  MdCardModule,
  MdButtonModule,
  MdIconModule,
  MdInputModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page.component';
import { RoutingModule } from './home.routing';
import { ToolbarModule } from 'modules/toolbar';
import { WorkshopComponent } from '../workshop/workshop.component';
import { SearchComponent } from '../search/search.component';
import { UploadComponent } from '../upload/upload.component';

@NgModule({
  declarations: [
    HomePageComponent,
    WorkshopComponent,
    SearchComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoutingModule,
    ToolbarModule,
    MdTabsModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
  ],
})
export class HomeModule { }
