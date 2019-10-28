import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { WeightNoteService } from '../../services/weightnote.service';

@Component({
  selector: 'app-create-weightnote',
  templateUrl: './create-weightnote.component.html',
  styleUrls: ['./create-weightnote.component.scss']
})
export class CreateWeightnoteComponent implements OnInit {
  dialogTitleName: string;
  weightMetalForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateWeightnoteComponent>,
    private weightnoteService: WeightNoteService,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.weightMetalForm = new FormGroup({
      carNo: new FormControl('', Validators.required),
      fullWeight: new FormControl('', Validators.required),
      scaleNo: new FormControl(1),
    });
  }

  ngOnInit() {
    console.log('createWeightNote_ngOninit');
    this.dialogTitleName = '磅單開立';
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
