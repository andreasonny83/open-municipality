import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() { }

  logout() {
    this.auth
      .logout();

      this.logoutHandler();
  }

  logoutHandler() {
    console.log('logged out');

    this.router.navigate(['/login']);
  }
}
