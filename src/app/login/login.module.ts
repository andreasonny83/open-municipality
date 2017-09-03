import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RoutingModule } from './login.routing';
import { MdButtonModule } from '@angular/material';

export { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    MdButtonModule,
  ]
})
export class LoginModule {}
