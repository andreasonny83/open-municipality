import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public appTitle: string;

  constructor(
    private auth: AuthService,
  ) {
    this.appTitle = auth.appName;
  }

  ngOnInit() { }

  logout() {
    this.auth.signOut();
  }
}
