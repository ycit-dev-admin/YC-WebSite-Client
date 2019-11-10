import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { WeightNoteService } from '../../services/weightnote.service';
import { strictEqual } from 'assert';
import { computeStyle } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-create-weightnote',
  templateUrl: './create-weightnote.component.html',
  styleUrls: ['./create-weightnote.component.scss']
})
export class CreateWeightnoteComponent implements OnInit {
  dialogTitleName: string;
  weightMetalForm: FormGroup;
  errorMsg: string;

  constructor(
    public dialogRef: MatDialogRef<CreateWeightnoteComponent>,
    private weightnoteService: WeightNoteService,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.weightMetalForm = new FormGroup({
      carNo: new FormControl('', Validators.required),
      carNo2: new FormControl('', Validators.required),
      fullWeight: new FormControl('', Validators.required),
      scaleNo: new FormControl(1),
    });
  }

  ngOnInit() {
    console.log('createWeightNote_ngOninit');
    this.dialogTitleName = '磅單開立';
  }

  testRegValidate($event: KeyboardEvent) {
    // const testReFormat = /[a-zA-Z0-9]{1,4}/g;
    // console.log($event);
    // var haha = this.weightMetalForm.value.carNo;

    // console.log('haha=' + haha);
    // const testReFormat = /[a-zA-Z0-9]/;

    /* var code;
    if ($event.key !== undefined) {
      code = $event.key;
    } else if ($event.keyIdentifier !== undefined) {
      code = $event.keyIdentifier;
    } else if ($event.keyCode !== undefined) {
      code = $event.keyCode;
    } */

    /* if (String.fromCharCode($event.keyCode).search(testReFormat) === -1) {
      this.errorMsg = '只允許輸入英文或數字';
    } else {
      this.errorMsg = '';
    } */
  }

  testKeyup($event: KeyboardEvent) {
    // const testReFormat = /[a-zA-Z0-9]{1,4}/g;
    // console.log($event);
    var haha2: string = this.weightMetalForm.value.carNo;

    console.log('haha2=' + haha2);
    const testReFormat = /[a-zA-Z0-9]{1,4}/;

    /* var code;
    if ($event.key !== undefined) {
      code = $event.key;
    } else if ($event.keyIdentifier !== undefined) {
      code = $event.keyIdentifier;
    } else if ($event.keyCode !== undefined) {
      code = $event.keyCode;
    } */
    // return True/False
    console.log(haha2.split(/[a-zA-Z0-9]/));
    if (/[a-zA-Z0-9]/.test(haha2)) {
      this.errorMsg = '';
    } else {
      this.errorMsg = '只允許輸入英文或數字2';
    }
  }

  testClick() {

    if (this.weightMetalForm.dirty && this.weightMetalForm.valid) {
      this.weightnoteService.addWeightnote(this.weightMetalForm.value).subscribe(
        post => {
          // this.router.navigate(['/yc/posts/', post.id]);
          // this.router.navigate(['/yc/procurement-process']);  // 導頁用
          this.dialogRef.close();
        },
        validationResult => {
          this.snackBar.open('There are validation errors!', 'Close', { duration: 3000 });
          // ValidationErrorHandler.handleFormValidationErrors(this.postForm, validationResult);
        });
    }
    console.log('test click qq');
  }

}
