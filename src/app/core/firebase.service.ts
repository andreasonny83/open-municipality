import { Injectable, Optional } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

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

  fetchProject(projectID: string): FirebaseListObservable<any[]> {
    return this.db.list(`/projects/${projectID}`);
  }

  saveProject(form: any, isDraft: boolean = false, projectID?: string): firebase.Promise<string> {
    const userID = this.authService.userDetails.uid;
    const draftInfo = {
      title: form.title,
    };

    return this
      .createProject(form, projectID)
      .then((pID: string) => {
        projectID = pID;

        return this.db
          .list(`/drafts/${userID}`)
          .update(projectID, draftInfo)
          .then(() => projectID);
      });
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
