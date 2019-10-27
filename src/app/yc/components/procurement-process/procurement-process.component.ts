import { Component, OnInit } from '@angular/core';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';
import { WeightNote } from '../../models/weightnote';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { WeightNoteService } from '../../services/weightnote.service';
import { MatDialog, Sort } from '@angular/material';
import { WeightNoteinfoDialogComponent } from '../weightnoteinfo-dialog/weightnoteinfo-dialog.component';
import { WeightNoteParameters } from '../../models/weightNote-parameters';
import { OpenIdConnectService } from 'src/app/shared/oidc/open-id-connect.service';
import { CreateWeightnoteComponent } from '../create-weightnote/create-weightnote.component';

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




  constructor(public dialog: MatDialog,
              public openIdConnectService: OpenIdConnectService) {
  }

  ngOnInit() {
    console.log('ProcurementProcessComponent_ngOninit');
  }



  createWeightNoteByDialog() {
    const dialogRef = this.dialog.open(CreateWeightnoteComponent, {
      width: '700px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });



  }

}
