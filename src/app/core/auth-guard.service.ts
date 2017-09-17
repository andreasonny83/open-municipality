import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class AuthGuard implements CanActivate {
  public allowed: boolean;

  constructor(private af: AngularFireAuth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.af.authState.map(auth => {
      if (!auth) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });
  }
}
