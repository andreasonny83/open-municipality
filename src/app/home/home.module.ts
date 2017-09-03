import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RoutingModule } from './home.routing';
import {
  MdButtonModule,
  MdToolbarModule,
  MdIconModule,
} from '@angular/material';

@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
  ],
})
export class HomeModule { }
