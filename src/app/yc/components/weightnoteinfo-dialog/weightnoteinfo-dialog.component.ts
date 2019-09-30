import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-weightnoteinfo-dialog',
  templateUrl: './weightnoteinfo-dialog.component.html',
  styleUrls: ['./weightnoteinfo-dialog.component.scss']
})
export class WeightNoteinfoDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  showWeightNoteDialog() {
    this.dialog.open(WeightNoteinfoDialogComponent);
  }

}
