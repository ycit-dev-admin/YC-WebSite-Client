import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { WeightNoteService } from '../../services/weightnote.service';
import { strictEqual } from 'assert';
import { computeStyle } from '@angular/animations/browser/src/util';
import { validEvents } from '@tinymce/tinymce-angular/editor/Events';
import { DISABLED } from '@angular/forms/src/model';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-create-weightnote',
  templateUrl: './create-weightnote.component.html',
  styleUrls: ['./create-weightnote.component.scss']
})
export class CreateWeightnoteComponent implements OnInit {
  dialogTitleName: string;
  createWeightnoteForm: FormGroup;
  testErrorMsg: string;
  showBollean: boolean;

  // tslint:disable-next-line: variable-name
  weightnote_validation_messages = {
    carNoOne: [
      { type: 'required', message: '此為必填欄位' },
      { type: 'minlength', message: '長度不能低於2碼' },
      { type: 'pattern', message: '只允許英數' }
    ],
    carNoTwo: [
      { type: 'required', message: '此為必填欄位' },
      { type: 'minlength', message: '長度不能低於2碼' },
      { type: 'pattern', message: '只允許英數' }
    ],
    fullWeight: [
      { type: 'required', message: '此為必填欄位' },
      { type: 'maxlength', message: '輸入長度不符所選磅秤' },
      { type: 'pattern', message: '只允許數字' }
    ]
  };

  constructor(
    public dialogRef: MatDialogRef<CreateWeightnoteComponent>,
    private weightnoteService: WeightNoteService,
    private router: Router,
    private snackBar: MatSnackBar) {
    /* this.createWeightnoteForm = new FormGroup({
      carNo: new FormControl('', Validators.required),
      carNoOne: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z0-9]{0,4}')
      ])),
      carNoTwo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z0-9]{0,4}')
      ])),
      fullWeight: new FormControl('', Validators.compose([
        Validators.required
      ])),
      scaleNo: new FormControl(1)
    }); */
  }
  ngOnInit() {
    console.log('createWeightNote_ngOninit');
    this.dialogTitleName = '磅單開立';
    this.iniForm();
    this.setfullWeightValidators();
  }

  iniForm() {
    this.createWeightnoteForm = new FormBuilder().group({
      carNoOne: [null, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z0-9]{0,4}')]],
      carNoTwo: [null, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z0-9]{0,4}')]],
      scaleNo: [1, [Validators.required]],
      fullWeight: [null]
    });
  }

  setfullWeightValidators() {
    const defaultValidators = [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')];
    // default
    const fullWeightControl = this.createWeightnoteForm.get('fullWeight');
    fullWeightControl.setValidators(defaultValidators.concat([Validators.maxLength(5)]));
    fullWeightControl.updateValueAndValidity();

    // 數值變動才會進入
    this.createWeightnoteForm.get('scaleNo').valueChanges
      .subscribe(scaleNoValue => {
        if (scaleNoValue === 1) {
          fullWeightControl.setValidators(defaultValidators.concat([Validators.maxLength(5)]));
          console.log('changed_1');
        }
        if (scaleNoValue === 2) {
          fullWeightControl.setValidators(defaultValidators.concat([Validators.maxLength(4)]));
          console.log('changed_2');

        }
        fullWeightControl.updateValueAndValidity();
      });

  }

  createWeightNote() {
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
