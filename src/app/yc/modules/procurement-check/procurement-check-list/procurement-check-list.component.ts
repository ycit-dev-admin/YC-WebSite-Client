import { Component, OnInit } from '@angular/core';
import { WeightNote } from 'src/app/yc/models/weightnote';

@Component({
  selector: 'app-procurement-check-list',
  templateUrl: './procurement-check-list.component.html',
  styleUrls: ['./procurement-check-list.component.scss']
})
export class ProcurementCheckListComponent implements OnInit {
  dataSource: WeightNote[];


  constructor() { }

  ngOnInit() {
  }

}
