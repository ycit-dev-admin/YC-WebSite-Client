import { Component, OnInit } from '@angular/core';
import { OpenIdConnectService } from 'src/app/shared/oidc/open-id-connect.service';

@Component({
  selector: 'app-procurement-process',
  templateUrl: './procurement-process.component.html',
  styleUrls: ['./procurement-process.component.scss']
})
export class ProcurementProcessComponent implements OnInit {

  // pageMeta: PageMeta;
  // weightNoteParameter = new WeightNoteParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });
  // dataSource: WeightNote[];




  constructor(public openIdConnectService: OpenIdConnectService) {
  }

  ngOnInit() {
    console.log('ProcurementProcessComponent_ngOninit');
  }





}
