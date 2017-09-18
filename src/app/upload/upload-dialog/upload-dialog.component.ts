import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FirebaseService } from '../../core/firebase.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  public model;
  public areas: any[];

  constructor(
    public dialogRef: MdDialogRef<UploadDialogComponent>,
    private firebase: FirebaseService,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
    this.model = {};
  }

  ngOnInit() {
    this.model = {
      area: '',
      budget: '',
      partners: ''
    };

    this
      .firebase
      .fetchAreas()
      .subscribe(data => {
        console.log(data);

        this.areas = data;
      });

  }
}
