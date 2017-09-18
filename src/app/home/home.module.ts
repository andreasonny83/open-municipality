import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdTabsModule,
  MdCardModule,
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdDialogModule,
  MdSelectModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page.component';
import { RoutingModule } from './home.routing';
import { ToolbarModule } from 'modules/toolbar';
import { SearchComponent } from '../search/search.component';
import { UploadComponent } from '../upload/upload.component';
import { UploadDialogComponent } from '../upload/upload-dialog/upload-dialog.component';

@NgModule({
  declarations: [
    HomePageComponent,
    SearchComponent,
    UploadComponent,
    UploadDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    ToolbarModule,
    MdTabsModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdDialogModule,
    MdSelectModule,
  ],
  entryComponents: [
    UploadDialogComponent,
  ],
})
export class HomeModule { }
