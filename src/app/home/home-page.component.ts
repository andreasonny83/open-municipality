import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

interface INavLinks {
  link: string;
  label: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public appTitle: string;
  public navLinks: INavLinks[];
  public isUpload: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => route.firstChild)
      .mergeMap((route) => route.url)
      .map((segment) => segment.map((item) => item.path))
      .subscribe((segments) => {
        this.isUpload = segments.indexOf('upload') !== -1;
      });

    this.appTitle = auth.appName;
    this.navLinks = [
      { link: '/home/workshop', label: 'Workshop' },
      { link: '/home/search', label: 'Search' },
    ];
  }

  ngOnInit() { }

  logout() {
    this.auth.signOut();
  }
}
