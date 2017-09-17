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
    const userID = this.authService.userDetails.uid;

    return this.db.list(`/drafts/${userID}/${projectID}`);
  }

  saveProject(form, isDraft: boolean = false, projectID?: string): any {
    const userID = this.authService.userDetails.uid;

    if (!projectID) {
      return this.db.list(`/drafts/${userID}`).push(form);
    }

    const listPath: string = isDraft ?
      `/drafts/${userID}` :
      `/projects`;

    return this.db.list(listPath)
      .update(projectID, form);
  }

}
