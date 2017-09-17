import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  public model;

  constructor(
    public dialogRef: MdDialogRef<UploadDialogComponent>,
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
  }
}
