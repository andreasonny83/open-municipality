import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>;
  private currentUser: firebase.User;

  constructor(
    public afAuth: AngularFireAuth,
  ) {
    this.authState = this.afAuth.authState;

    this.authState
      .subscribe((user: firebase.User) => this.getUser(user));
  }

  getUser(user: firebase.User): void {
    console.log('user', user);

    if (!!user) {
      console.log('setting user');

      this.currentUser = user;
      return;
    }

    this.currentUser = null;
  }

  isLoggedIn() {
    if (this.currentUser == null) {
      return false;
    }

    return true;
  }

  loginWithGoogle() {
    return this.afAuth
      .auth
      .signInWithPopup(
        new firebase.auth.GoogleAuthProvider());
  }

  getAuthState(): Observable<firebase.User> {
    return this.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
