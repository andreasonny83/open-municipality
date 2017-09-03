import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public appTitle: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
  ) {
    this.appTitle = auth.appName;
  }

  ngOnInit() {
    this.route.data
    .subscribe((data) => {
      console.log('data', data);
    });
  }

  logout() {
    this.auth.signOut();
  }
}
