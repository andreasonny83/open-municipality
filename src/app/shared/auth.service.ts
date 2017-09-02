import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.user = firebaseAuth.authState;
    this.userDetails = null;

    firebaseAuth.authState.subscribe(
      (user: firebase.User) => this.handleFireBaseUser(user),
      (err: any) => this.resetFirebaseUser(),
    );
  }

  handleFireBaseUser(user: firebase.User) {
    console.log('user status changed', user);

    this.userDetails = null;

    if (!!user) {
      this.userDetails = user;
      return;
    }

    this.resetFirebaseUser();
  }

  resetFirebaseUser(): void {
    console.log('logging out');

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
