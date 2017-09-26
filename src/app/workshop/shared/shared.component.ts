import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  public projects: any[];

  constructor(
    private firebase: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this
      .firebase
      .fetchSharedProjects()
      .subscribe(projects => this.handleSharedProjects(projects));
  }

  editProject(projectID: string) {
    this.router.navigate(['/home/edit/', projectID]);
  }

  private handleSharedProjects(projects: any[]) {
    this.projects = projects;
  }

}
