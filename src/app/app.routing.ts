import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth-guard.service';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
