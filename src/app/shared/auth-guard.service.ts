import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    return this.auth.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(auth => !auth ? this.router.navigate(['/login']) : true);
  }
}
