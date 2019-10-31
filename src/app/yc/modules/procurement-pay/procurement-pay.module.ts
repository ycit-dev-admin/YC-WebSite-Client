import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementPaySiteComponent } from './procurement-pay-site/procurement-pay-site.component';
import { ProcurementPayListComponent } from './procurement-pay-list/procurement-pay-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [ProcurementPaySiteComponent, ProcurementPayListComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProcurementPaySiteComponent
  ]
})
export class ProcurementPayModule { }
