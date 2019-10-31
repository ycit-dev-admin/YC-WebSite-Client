import { Component, OnInit, Input } from '@angular/core';
import { WeightNote } from 'src/app/yc/models/weightnote';
import { MatDialog, Sort } from '@angular/material';
import { WeightNoteService } from 'src/app/yc/services/weightnote.service';
import { OpenIdConnectService } from 'src/app/shared/oidc/open-id-connect.service';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { WeightNoteParameters } from 'src/app/yc/models/weightNote-parameters';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';

@Component({
  selector: 'app-procurement-weight-list',
  templateUrl: './procurement-weight-list.component.html',
  styleUrls: ['./procurement-weight-list.component.scss']
})
export class ProcurementWeightListComponent implements OnInit {

  @Input()
  dataSource: WeightNote[];

  pageMeta: PageMeta;
  weightNoteParameter = new WeightNoteParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });
  // tslint:disable-next-line: max-line-length
  displayColumns: string[] = ['id', 'title', 'field1', 'author', 'field2', 'field3', 'lastModified', 'field4'];
  constructor(public dialog: MatDialog, public weightNoteService: WeightNoteService, public openIdConnectService: OpenIdConnectService) { }

  ngOnInit() {
  }

  load() {
    this.weightNoteService.getPagedWeightNotes(this.weightNoteParameter).subscribe(resp => {
      this.pageMeta = JSON.parse(resp.headers.get('X-Pagination')) as PageMeta;
      const pagedResult = { ...resp.body } as ResultWithLinks<WeightNote>;
      this.dataSource = pagedResult.value;
    });
  }

  // 要改成呼叫父元件(事件繫結+Ouput) ProcurementCheckSite的sortData
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

}
