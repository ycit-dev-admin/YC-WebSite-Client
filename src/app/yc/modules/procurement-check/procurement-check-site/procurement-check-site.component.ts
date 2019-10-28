import { Component, OnInit } from '@angular/core';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { WeightNote } from 'src/app/yc/models/weightnote';
import { WeightNoteParameters } from 'src/app/yc/models/weightNote-parameters';
import { MatDialog } from '@angular/material';
import { WeightNoteService } from 'src/app/yc/services/weightnote.service';
import { OpenIdConnectService } from 'src/app/shared/oidc/open-id-connect.service';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';
import { CreateWeightnoteComponent } from 'src/app/yc/components/create-weightnote/create-weightnote.component';

@Component({
  selector: 'app-procurement-check-site',
  templateUrl: './procurement-check-site.component.html',
  styleUrls: ['./procurement-check-site.component.scss']
})
export class ProcurementCheckSiteComponent implements OnInit {
  pageMeta: PageMeta;
  dataSource: WeightNote[];
  weightNoteParameter = new WeightNoteParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });

  constructor(public dialog: MatDialog,
              private weightNoteService: WeightNoteService,
              public openIdConnectService: OpenIdConnectService) { }

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

  createWeightNoteByDialog() {
    const dialogRef = this.dialog.open(CreateWeightnoteComponent, {
      width: '700px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.load();
    });
  }

}
