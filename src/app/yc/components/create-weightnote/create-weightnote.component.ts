import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { WeightNoteService } from '../../services/weightnote.service';

@Component({
  selector: 'app-create-weightnote',
  templateUrl: './create-weightnote.component.html',
  styleUrls: ['./create-weightnote.component.scss']
})
export class CreateWeightnoteComponent implements OnInit {

  weightMetalForm: FormGroup;
  
  constructor(
    private weightnoteService: WeightNoteService,
    private router: Router,
    private snackBar: MatSnackBar) 
    {
    this.weightMetalForm = new FormGroup({
      carNo: new FormControl('', Validators.required),
      fullWeight: new FormControl('', Validators.required),
      scaleNo: new FormControl(1),
    });
   }

  ngOnInit() {        
  }

  submit() {
    if (this.weightMetalForm.dirty && this.weightMetalForm.valid) {
      this.weightnoteService.addWeightnote(this.weightMetalForm.value).subscribe(
        post => {
          //this.router.navigate(['/yc/posts/', post.id]);
          this.router.navigate(['/yc/pos-purchase']);  //導頁用
        },
        validationResult => {
          this.snackBar.open('There are validation errors!', 'Close', { duration: 3000 });
          //ValidationErrorHandler.handleFormValidationErrors(this.postForm, validationResult);
        });
    }
  }

}
