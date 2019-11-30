import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-weightnoteinfo-dialog',
  templateUrl: './weightnoteinfo-dialog.component.html',
  styleUrls: ['./weightnoteinfo-dialog.component.scss']
})
export class WeightNoteinfoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, public dialog: MatDialog) {
    console.log(`QQ id : ${data.weightNoteId}`);
  }

  ngOnInit() {
  }



}
