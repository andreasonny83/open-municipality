import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate() {
    return false;

    // if (!this.auth.isLoggedIn()) {
    //   this.router.navigate(['']);
    //   return false;
    // }

    // return true;
  }
}
