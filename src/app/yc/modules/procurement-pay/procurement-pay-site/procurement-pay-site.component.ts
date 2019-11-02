import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WeightNoteService } from 'src/app/yc/services/weightnote.service';
import { OpenIdConnectService } from 'src/app/shared/oidc/open-id-connect.service';
import { WeightNoteParameters } from 'src/app/yc/models/weightNote-parameters';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';
import { WeightNote } from 'src/app/yc/models/weightnote';

@Component({
  selector: 'app-procurement-pay-site',
  templateUrl: './procurement-pay-site.component.html',
  styleUrls: ['./procurement-pay-site.component.scss']
})
export class ProcurementPaySiteComponent implements OnInit {
  pageMeta: PageMeta;
  weightNoteParameter = new WeightNoteParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });
  dataSource: WeightNote[];

  constructor(private weightNoteService: WeightNoteService,
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

}
