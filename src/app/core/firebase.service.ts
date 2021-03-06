import { Injectable, Optional } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FirebaseService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) {
  }

  fetchProjectTags(target: string): FirebaseListObservable<any[]> {
    return this.db.list(target);
  }

  fetchDraftProjects(): FirebaseListObservable<any[]> {
    const userID: string = this.authService.userDetails.uid;

    return this.db.list(`/drafts/${userID}`);
  }

  fetchSharedProjects(): FirebaseListObservable<any[]> {
    const userID: string = this.authService.userDetails.uid;

    return this.db.list(`/published`, {
      query: {
        orderByChild: 'author',
        equalTo: userID
      }
    });
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
    };

    const projectInfo = {
      title: form.title,
      content: form.content,
      author: userID,
      status: status,
    };

    return this
      .createProject(projectInfo, projectID)
      .then(pID => {
        projectID = pID;

        const calls = [
          this.db.list(`/drafts/${userID}`).update(projectID, draftInfo),
        ];

        if (status === 'published') {
          calls.push(
            this.db.list(`/published`).update(projectID, draftInfo),
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

  fetchProjectDataCreation(projectID) {
    return this.db.object(`/projects/${projectID}`)
      .map(data => data.dataCreated);
  }

  publishProject(publishingDetails, projectInfo, projectID: string): firebase.Promise<string> {
    const userID: string = this.authService.userDetails.uid;
    let dataCreated;

    this.fetchProjectDataCreation(projectID)
      .toPromise()
      .then(data => dataCreated = data);

    const projectForm = {
      title: projectInfo.title,
      content: projectInfo.content,
      description: publishingDetails.description,
      status: projectInfo.status,
    };

    const publishedInfo = {
      title: projectInfo.title,
      author: userID,
      area: publishingDetails.area,
      budget: publishingDetails.budget,
      description: publishingDetails.description,
    };

    return this
      .saveProject(projectForm, projectID)
      .then(() => {
        this.db.list('/published')
          .update(projectID, publishedInfo);
      });
  }

  unpublishProject(projectID: string) {
    return this.deletePublished(projectID)
      .then(() => {
        return this.db.list(`/projects/${projectID}`)
          .set('status', 'upublished');
      });
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
    const dateCreated = firebase.database.ServerValue.TIMESTAMP;

    if (!projectID) {
      form.dateCreated = dateCreated;
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
