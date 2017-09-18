import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdTabsModule,
  MdCardModule,
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdDialogModule,
} from '@angular/material';
import { RoutingModule } from './drafts.routing';
import { WorkshopComponent } from './workshop.component';
import { DraftsComponent } from './drafts/drafts.component';

@NgModule({
  declarations: [
    WorkshopComponent,
    DraftsComponent,
  ],
  imports: [
    CommonModule,
    MdTabsModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdDialogModule,
    RoutingModule,
  ]
})
export class WorkshopModule { }
