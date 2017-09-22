import { Injectable, Optional } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
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

  fetchProjectObject(projectID: string): FirebaseObjectObservable<any[]> {
    return this.db.object(`/projects/${projectID}`);
  }

  saveProject(form: any, projectID?: string): firebase.Promise<string> {
    const userID: string = this.authService.userDetails.uid;
    const status = form.status || 'draft';
    const draftInfo = {
      title: form.title,
      author: userID,
    };

    const projectInfo = {
      title: form.title,
      content: form.content,
      author: userID,
      status: status,
    };

    return this
      .createProject(projectInfo, projectID)
      .then((pID: string) => {
        projectID = pID;

        const calls = [
          this.db.list(`/drafts/${userID}`).update(projectID, draftInfo),
        ];

        console.log(status);

        if (status === 'published') {
          calls.push(
            this.db.list(`/published/${projectID}`).set('title', draftInfo.title),
          );
        }
        return Observable.forkJoin(...calls);
      })
      .then(() => projectID);
  }

  deleteProjects(projectID: string): Observable<any> {
    return Observable.forkJoin([
      this.deleteProject(projectID),
      this.deletePublished(projectID),
      this.deleteDraft(projectID),
    ]);
  }

  publishProject(publishingDetails, projectInfo, projectID: string): firebase.Promise<string> {
    const userID: string = this.authService.userDetails.uid;

    const projectForm = {
      title: projectInfo.title,
      content: projectInfo.content,
      status: projectInfo.status,
    };

    const publishedInfo = {
      title: projectInfo.title,
      author: userID,
    };

    return this
      .saveProject(projectForm, projectID)
      .then(() => this.db.list('/published').update(projectID, publishedInfo));
  }

  unpublishProject(projectID: string) {
    return this.db
      .list(`/projects/${projectID}`)
      .set('status', 'upublished');

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
