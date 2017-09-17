import { Injectable, Optional } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

export class AuthServiceConfig {
  appName: string;

  constructor() {
    this.appName = '';
  }
}

@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User;
  public appName: string;

  constructor(
    @Optional() config: AuthServiceConfig,
    private firebaseAuth: AngularFireAuth,
    private router: Router,
  ) {
    if (config) {
      this.appName = config.appName;
    }

    this.user = firebaseAuth.authState;
    this.userDetails = null;

    firebaseAuth.authState.subscribe(
      (user: firebase.User) => this.handleFireBaseUser(user),
      (err: any) => this.resetFirebaseUser(),
    );
  }

  handleFireBaseUser(user: firebase.User) {
    this.userDetails = null;

    if (!!user) {
      this.userDetails = user;
      return;
    }

    this.resetFirebaseUser();
  }

  resetFirebaseUser(err?): void {
    if (err) {
      console.log('error', err);
    }

    this.userDetails = null;

    this.router.navigate(['/login']);
  }

  signInWithGoogle(): firebase.Promise<any> {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signOut(): firebase.Promise<any> {
    return this.firebaseAuth.auth.signOut();
  }
}
