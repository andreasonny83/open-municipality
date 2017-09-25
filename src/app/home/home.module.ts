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
  MdSnackBarModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page.component';
import { RoutingModule } from './home.routing';
import { ToolbarModule } from 'modules/toolbar';
import { SearchComponent } from '../search/search.component';
import { UploadComponent } from '../upload/upload.component';
import { DeleteDialogComponent } from '../upload/delete-dialog/delete-dialog.component';
import { UploadDialogComponent } from '../upload/upload-dialog/upload-dialog.component';
import { QuillModule } from 'ngx-quill';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    HomePageComponent,
    SearchComponent,
    UploadComponent,
    UploadDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    DragulaModule,
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
    MdSnackBarModule,
    QuillModule,
  ],
  entryComponents: [
    UploadDialogComponent,
    DeleteDialogComponent,
  ],
})
export class HomeModule { }
