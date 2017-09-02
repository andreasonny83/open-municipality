import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public title: string;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.title = 'Open Municipality';

    this.auth
      .user
      .subscribe(
        (user: firebase.User) => this.userAuthenticatedHandler(user),
        (err: any) => this.userAuthenticatedHandler(null),
      );
  }

  loginWithGoogle(): void {
    this.auth
      .signInWithGoogle()
      .then(() => this.router.navigate(['']));
  }

  userAuthenticatedHandler(user: firebase.User): void {
    if (!!user) {
      this.router.navigate(['']);
    }
  }
}
