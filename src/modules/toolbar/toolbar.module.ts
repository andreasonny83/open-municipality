import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import {
  MdButtonModule,
  MdToolbarModule,
  MdIconModule,
} from '@angular/material';

@NgModule({
  declarations: [
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
  ],
  exports: [
    ToolbarComponent,
  ]
})
export class ToolbarModule { }
