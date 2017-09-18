import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {
  public projects: any[];

  constructor(
    private firebase: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this
      .firebase
      .fetchDraftProjects()
      .subscribe(projects => this.handleDraftProjects(projects));
  }

  editProject(projectID: string) {
    this.router.navigate(['/home/edit/', projectID]);
  }

  private handleDraftProjects(projects: any[]) {
    console.log(projects);

    this.projects = projects;
  }

}
