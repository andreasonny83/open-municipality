import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FirebaseService } from '../core/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  token: string;
  isSavedProject: boolean;
  project: any;

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MdDialog,
  ) {
    this.isSavedProject = false;

    this.form = fb.group({
      title: ['', Validators.required ],
      content: ['', Validators.required ],
    });
  }

  ngOnInit() {
    this.route
      .paramMap
      .subscribe(params => this.getParams(params));
  }

  getParams(params): void {
    this.token = params.get('id');

    if (this.token) {
      this.project = this.firebase.fetchProjectObject(this.token);

      this.firebase
        .fetchProject(this.token)
        .map(items => items.filter(el => el.$key in this.form.controls))
        .subscribe(items => items.map(item => {
          this.isSavedProject = true;
          this.form.controls[item.$key].setValue(item.$value);
        }));
    }
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }

  save(): void {
    const form = this.extractFormDetails();

    this.firebase
      .saveProject(form, this.token)
      .then((projectID: string) => {
        if (!!projectID) {
          this.router.navigate(['/home/edit', projectID]);
        }
      })
      .catch(err => console.log('error', err));
  }

  publish(): void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {});
    const formDetails = this.extractFormDetails();

    dialogRef
      .afterClosed()
      .subscribe(publishingDetails =>
          this.publishProjectHandler(
            this.token,
            publishingDetails,
            formDetails));

  }

  deleteProject(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {});

    dialogRef
      .afterClosed()
      .subscribe(res => this.deleteProjectHandler(res));
  }

  private extractFormDetails() {
    return {
      title: this.form.get('title').value,
      content: this.form.get('content').value,
    };
  }

  private deleteProjectHandler(res): void {
    if (!res) {
      return;
    }

    this
      .firebase
      .deleteProjects(this.token)
      .subscribe(() => this.cancel());
  }

  private publishProjectHandler(projectID, publishingDetails, projectInfo): void {
    if (!publishingDetails) {
      return;
    }

    this
      .firebase
      .publishProject(publishingDetails, projectInfo, projectID)
      .then((res: string) => {
        if (!!res) {
          this.router.navigate(['/home/edit', res]);
        }
      });

      // .subscribe(() => this.cancel());
  }
}
