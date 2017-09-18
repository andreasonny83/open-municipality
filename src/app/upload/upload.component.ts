import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
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

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MdDialog,
  ) {
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
      this.firebase
        .fetchProject(this.token)
        .map(items => items.filter(el => el.$key in this.form.controls))
        .subscribe(items => items.map(item => {
          this.form.controls[item.$key].setValue(item.$value);
        }));
    }
  }

  cancel(event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate(['/home']);
  }

  save(event: MouseEvent): void {
    event.preventDefault();

    const form = {
      title: this.form.get('title').value,
      content: this.form.get('content').value,
    };

    this.firebase
      .saveProject(form, true, this.token)
      .then((projectID: string) => {
        if (!!projectID) {
          this.router.navigate(['/home/edit', projectID]);
        }
      })
      .catch(err => console.log('error', err));
  }

  publish(): void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      // data: {  }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(result);
      });
  }

}
