import { Injectable, Optional } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class FirebaseService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) {
  }

  fetchAreas(): FirebaseListObservable<any[]> {
    return this.db.list('areas');
  }

  fetchDraftProjects(): FirebaseListObservable<any[]> {
    const userID: string = this.authService.userDetails.uid;

    return this.db.list(`/drafts/${userID}`);
  }

  fetchProject(projectID: string): FirebaseListObservable<any[]> {
    return this.db.list(`/projects/${projectID}`);
  }

  saveProject(form: any, isDraft: boolean = false, projectID?: string): firebase.Promise<string> {
    const userID: string = this.authService.userDetails.uid;
    const draftInfo = {
      title: form.title,
      author: userID,
    };

    const projectInfo = {
      title: form.title,
      content: form.content,
      author: userID,
      status: 'draft'
    };

    return this
      .createProject(projectInfo, projectID)
      .then((pID: string) => {
        projectID = pID;

        return this.db
          .list(`/drafts/${userID}`)
          .update(projectID, draftInfo)
          .then(() => projectID);
      });
  }

  deleteProjects(projectID: string): Observable<any> {
    return Observable.forkJoin([
      this.deleteProject(projectID),
      this.deletePublished(projectID),
      this.deleteDraft(projectID),
    ]);
  }

  private deleteProject(projectID: string) {
    return this.db.list('/projects')
      .remove(projectID);
  }

  private deletePublished(projectID: string) {
    return this.db.list(`/published`)
      .remove(projectID);
}

  private deleteDraft(projectID: string) {
    const userID: string = this.authService.userDetails.uid;

    return this.db.list(`/drafts/${userID}`)
      .remove(projectID);
  }

  private createProject(form, projectID?): firebase.Promise<string> {
    if (!projectID) {
      return this.db.list('/projects')
        .push(form)
        .then(pID => pID.key);
    } else {
      return this.db.list('/projects')
        .update(projectID, form)
        .then(() => projectID);
    }
  }
}
