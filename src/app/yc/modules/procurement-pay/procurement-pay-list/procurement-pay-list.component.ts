import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeightNote } from 'src/app/yc/models/weightnote';
import { Sort } from '@angular/material';


@Component({
  selector: 'app-procurement-pay-list',
  templateUrl: './procurement-pay-list.component.html',
  styleUrls: ['./procurement-pay-list.component.scss']
})
export class ProcurementPayListComponent implements OnInit {

  @Input()
  dataSource: WeightNote[];

  @Output()
  needSort = new EventEmitter<any>();

  // tslint:disable-next-line: max-line-length
  displayColumns: string[] = ['id', 'title', 'author', 'f1', 'f2', 'f3', 'f4', 'lastModified'];
  constructor() { }

  ngOnInit() {
  }

  sortData(sort: any) {
    console.log('payListPrint');
    this.needSort.emit(sort);
  }

}
