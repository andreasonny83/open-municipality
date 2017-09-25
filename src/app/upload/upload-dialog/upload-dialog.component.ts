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
  public budgets: any[];

  public get isValid(): boolean {
    return !!this.model.area && !!this.model.budget;
  }

  constructor(
    public dialogRef: MdDialogRef<UploadDialogComponent>,
    private firebase: FirebaseService,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
    this.model = {};
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;

    this.model = {
      area: '',
      budget: '',
    };

    this
      .firebase
      .fetchProjectTags('areas')
      .subscribe(areas => this.areas = areas);

    this
      .firebase
      .fetchProjectTags('budgets')
      .subscribe(budgets => this.budgets = budgets);
  }

  public publish() {
    return this.dialogRef.close(this.model);
  }
}
