import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title: string;
  user: any;
  topics: FirebaseListObservable<any[]>;

  constructor(
    private auth: AuthService,
    public db: AngularFireDatabase,
    private router: Router,
  ) {}

  ngOnInit() {
    this.title = 'Open Municipality';

    this.auth
      .getAuthState()
      .subscribe(user => this.user = user);

    this.topics = this.db.list('/topics');
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}
