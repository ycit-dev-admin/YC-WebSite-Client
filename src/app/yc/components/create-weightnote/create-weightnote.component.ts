import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { WeightNoteService } from '../../services/weightnote.service';
import { strictEqual } from 'assert';
import { computeStyle } from '@angular/animations/browser/src/util';
import { validEvents } from '@tinymce/tinymce-angular/editor/Events';

@Component({
  selector: 'app-create-weightnote',
  templateUrl: './create-weightnote.component.html',
  styleUrls: ['./create-weightnote.component.scss']
})
export class CreateWeightnoteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateWeightnoteComponent>,
    private weightnoteService: WeightNoteService,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.createWeightnoteForm = new FormGroup({
      carNo: new FormControl('', Validators.required),
      carNoOne: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z0-9]{0,4}')
      ])),
      fullWeight: new FormControl('', Validators.required),
      scaleNo: new FormControl(1),
    });
  }
  dialogTitleName: string;
  createWeightnoteForm: FormGroup;
  testErrorMsg: string;
  showBollean: boolean;


  // tslint:disable-next-line: variable-name
  weightnote_validation_messages = {
    carNoOne: [
      { type: 'required', message: '此為必填欄位' },
      { type: 'minlength', message: '長度不能低於3碼' },
      { type: 'pattern', message: '只允許英數' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ]/* ,
    confirm_password: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ] */
  };

  ngOnInit() {
    console.log('createWeightNote_ngOninit');
    this.dialogTitleName = '磅單開立';
  }

  wowErrorMessage() {
    this.showBollean = false;
    if (this.createWeightnoteForm.get('carNo2').hasError('minlength')) {
      this.showBollean = true;
      this.testErrorMsg = '長度不足2';
    }
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
    /* var haha2: string = this.weightMetalForm.value.carNo;

    console.log('haha2=' + haha2);
    const testReFormat = /[a-zA-Z0-9]{1,4}/; */

    /* var code;
    if ($event.key !== undefined) {
      code = $event.key;
    } else if ($event.keyIdentifier !== undefined) {
      code = $event.keyIdentifier;
    } else if ($event.keyCode !== undefined) {
      code = $event.keyCode;
    } */
    // return True/False
    /*  console.log(haha2.split(/[a-zA-Z0-9]/));
     if (/[a-zA-Z0-9]/.test(haha2)) {
       this.errorMsg = '';
     } else {
       this.errorMsg = '只允許輸入英文或數字2';
     } */
  }

  testClick() {

    if (this.createWeightnoteForm.dirty && this.createWeightnoteForm.valid) {
      this.weightnoteService.addWeightnote(this.createWeightnoteForm.value).subscribe(
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
