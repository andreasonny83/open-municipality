import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

interface INavLinks {
  link: string;
  label: string;
}

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {
  public pages: INavLinks[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.pages = [
      { link: 'drafts', label: 'Drafts' },
      { link: 'shared', label: 'Shared' },
      { link: 'saved', label: 'Saved' },
    ];
  }

}
