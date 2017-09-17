import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchCategories: any[];

  constructor(
    private firebase: FirebaseService,
  ) { }

  ngOnInit() {
    this
      .firebase
      .fetchAreas()
      .subscribe(data => this.searchCategories = data);
  }

}
