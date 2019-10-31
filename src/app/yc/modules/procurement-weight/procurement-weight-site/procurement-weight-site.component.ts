import { Component, OnInit, Input } from '@angular/core';
import { WeightNote } from 'src/app/yc/models/weightnote';
import { WeightNoteService } from 'src/app/yc/services/weightnote.service';
import { OpenIdConnectService } from 'src/app/shared/oidc/open-id-connect.service';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { WeightNoteParameters } from 'src/app/yc/models/weightNote-parameters';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';

@Component({
  selector: 'app-procurement-weight-site',
  templateUrl: './procurement-weight-site.component.html',
  styleUrls: ['./procurement-weight-site.component.scss']
})
export class ProcurementWeightSiteComponent implements OnInit {
  dataSource: WeightNote[];
  pageMeta: PageMeta;
  weightNoteParameter = new WeightNoteParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });

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
