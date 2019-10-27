import { Component, OnInit } from '@angular/core';
import { WeightNote } from 'src/app/yc/models/weightnote';
import { WeightNoteService } from 'src/app/yc/services/weightnote.service';
import { Sort, MatDialog } from '@angular/material';
import { WeightNoteParameters } from 'src/app/yc/models/weightNote-parameters';
import { WeightNoteinfoDialogComponent } from 'src/app/yc/components/weightnoteinfo-dialog/weightnoteinfo-dialog.component';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';


@Component({
  selector: 'app-procurement-check-list',
  templateUrl: './procurement-check-list.component.html',
  styleUrls: ['./procurement-check-list.component.scss']
})
export class ProcurementCheckListComponent implements OnInit {
  pageMeta: PageMeta;
  dataSource: WeightNote[];
  weightNoteParameter = new WeightNoteParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });
  public dialog: MatDialog;
  // tslint:disable-next-line: max-line-length
  displayColumns: string[] = ['carNo', 'fullWeight', 'ingredient', 'defectiveWeight', 'defectiveReason', 'excavatorOpEmpNo', 'createTime', 'operateAction'];

  constructor(private weightNoteService: WeightNoteService) { }

  ngOnInit() {
    this.load();
  }


  load() {
    this.weightNoteService.getPagedWeightNotes(this.weightNoteParameter).subscribe(resp => {
      this.pageMeta = JSON.parse(resp.headers.get('X-Pagination')) as PageMeta;
      const pagedResult = { ...resp.body } as ResultWithLinks<WeightNote>;
      this.dataSource = pagedResult.value;
    });
  }



  sortData(sort: Sort) {
    this.weightNoteParameter.orderBy = null;
    if (sort.direction) {
      this.weightNoteParameter.orderBy = sort.active;
      if (sort.direction === 'desc') {
        this.weightNoteParameter.orderBy += ' desc';
      }
    }
    this.load();
  }

  showWeightNoteDialog() {
    this.dialog.open(WeightNoteinfoDialogComponent);
  }


}
