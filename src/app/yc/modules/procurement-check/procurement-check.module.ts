import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementCheckListComponent } from './procurement-check-list/procurement-check-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ProcurementCheckSiteComponent } from './procurement-check-site/procurement-check-site.component';

@NgModule({
  declarations: [ProcurementCheckListComponent, ProcurementCheckSiteComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProcurementCheckListComponent,
    ProcurementCheckSiteComponent
  ]
})
export class ProcurementCheckModule { }
