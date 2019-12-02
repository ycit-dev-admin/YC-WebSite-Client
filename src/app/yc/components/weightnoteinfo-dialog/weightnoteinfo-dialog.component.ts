import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-weightnoteinfo-dialog',
  templateUrl: './weightnoteinfo-dialog.component.html',
  styleUrls: ['./weightnoteinfo-dialog.component.scss']
})
export class WeightNoteinfoDialogComponent implements OnInit {
  editWeightNoteForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    console.log(`QQ id : ${data.weightNote.id} & ${data.weightNote.carNo}`);
  }

  ngOnInit() {
    this.iniForm();
  }

  iniForm() {
    this.editWeightNoteForm = new FormBuilder().group({
      carNoOne: [null, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z0-9]{0,4}')]],
      carNoTwo: [null, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z0-9]{0,4}')]],
      scaleNo: [1, [Validators.required]],
      fullWeight: [null]
    });
  }

}
