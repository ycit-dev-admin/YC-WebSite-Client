import { Component, OnInit } from '@angular/core';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';
import { WeightNote } from '../../models/weightnote';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { WeightNoteService } from '../../services/weightnote.service';
import { MatDialog, Sort } from '@angular/material';
import { WeightNoteinfoDialogComponent } from '../weightnoteinfo-dialog/weightnoteinfo-dialog.component';
import { WeightNoteParameters } from '../../models/weightNote-parameters';
import { OpenIdConnectService } from 'src/app/shared/oidc/open-id-connect.service';

@Component({
  selector: 'app-procurement-process',
  templateUrl: './procurement-process.component.html',
  styleUrls: ['./procurement-process.component.scss']
})
export class ProcurementProcessComponent implements OnInit {

  pageMeta: PageMeta;
  weightNoteParameter = new WeightNoteParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });
  displayedColumns: string[] = ['id', 'title', 'author', 'lastModified'];
  // tslint:disable-next-line: max-line-length
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
