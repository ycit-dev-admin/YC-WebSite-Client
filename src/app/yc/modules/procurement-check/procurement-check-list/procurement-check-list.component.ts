import { Component, OnInit, Input } from '@angular/core';
import { WeightNote } from 'src/app/yc/models/weightnote';
import { WeightNoteService } from 'src/app/yc/services/weightnote.service';
import { Sort, MatDialog } from '@angular/material';
import { WeightNoteParameters } from 'src/app/yc/models/weightNote-parameters';
import { WeightNoteinfoDialogComponent } from 'src/app/yc/components/weightnoteinfo-dialog/weightnoteinfo-dialog.component';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';
import { CreateWeightnoteComponent } from 'src/app/yc/components/create-weightnote/create-weightnote.component';
import { OpenIdConnectService } from 'src/app/shared/oidc/open-id-connect.service';


@Component({
  selector: 'app-procurement-check-list',
  templateUrl: './procurement-check-list.component.html',
  styleUrls: ['./procurement-check-list.component.scss']
})
export class ProcurementCheckListComponent implements OnInit {

  @Input()
  dataSource: WeightNote[];


  pageMeta: PageMeta;
  // dataSource: WeightNote[];
  weightNoteParameter = new WeightNoteParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });

  // tslint:disable-next-line: max-line-length
  displayColumns: string[] = ['carNo', 'fullWeight', 'ingredient', 'defectiveWeight', 'defectiveReason', 'excavatorOpEmpNo', 'createTime', 'operateAction'];

  constructor(public dialog: MatDialog, private weightNoteService: WeightNoteService, public openIdConnectService: OpenIdConnectService) { }

  ngOnInit() {
    console.log('ProcurementCheckListComponent_ngOninit');
    // this.load();
  }


  // 要拿掉
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

  showWeightNoteDialog(weightNote: WeightNote) {
    console.log(`weightNoteId123 : ${JSON.stringify(weightNote)}`);
    this.dialog.open(WeightNoteinfoDialogComponent, {
      data: {
        weightNote: weightNote
      }
    });




  }



}
