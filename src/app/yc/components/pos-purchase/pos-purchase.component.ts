import { Component, OnInit, ViewChild } from '@angular/core';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { OpenIdConnectService } from 'src/app/shared/oidc/open-id-connect.service';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';
import { Sort, MatDialog, MatSort } from '@angular/material';
import { WeightNoteinfoDialogComponent } from '../weightnoteinfo-dialog/weightnoteinfo-dialog.component';
import { WeightNote } from '../../models/weightnote';
import { WeightNoteService } from '../../services/weightnote.service';
import { WeightNoteParameters } from '../../models/weightNote-parameters';


@Component({
  selector: 'app-pos-purchase',
  templateUrl: './pos-purchase.component.html',
  styleUrls: ['./pos-purchase.component.scss']
})
export class PosPurchaseComponent implements OnInit {


  pageMeta: PageMeta;
  weightNoteParameter = new WeightNoteParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });
  displayedColumns: string[] = ['id', 'title', 'author', 'lastModified'];
  step1DisplayedColumns: string[] = ['carNo', 'fullWeight', 'ingredient', 'defectiveWeight', 'defectiveReason', 'excavatorOpEmpNo', 'createTime', 'operateAction'];
  step3DisplayedColumns: string[] = ['id', 'title', 'field1', 'author', 'field2', 'field3', 'lastModified', 'field4'];
  step4DisplayedColumns: string[] = ['id', 'title', 'author', 'f1', 'f2', 'f3', 'f4', 'lastModified'];
  dataSource: WeightNote[];


  

  constructor(public dialog: MatDialog, private weightNoteService: WeightNoteService,
    private openIdConnectService: OpenIdConnectService) {
  }

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
