import { Component, OnInit, Input } from '@angular/core';
import { WeightNote } from 'src/app/yc/models/weightnote';

@Component({
  selector: 'app-procurement-pay-list',
  templateUrl: './procurement-pay-list.component.html',
  styleUrls: ['./procurement-pay-list.component.scss']
})
export class ProcurementPayListComponent implements OnInit {

  @Input()
  dataSource: WeightNote[];

  // tslint:disable-next-line: max-line-length
  displayColumns: string[] = ['id', 'title', 'author', 'f1', 'f2', 'f3', 'f4', 'lastModified'];
  constructor() { }

  ngOnInit() {
  }

}
