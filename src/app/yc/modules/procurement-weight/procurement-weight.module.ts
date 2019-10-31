import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementWeightSiteComponent } from './procurement-weight-site/procurement-weight-site.component';
import { ProcurementWeightListComponent } from './procurement-weight-list/procurement-weight-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [ProcurementWeightSiteComponent, ProcurementWeightListComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProcurementWeightSiteComponent
  ]
})
export class ProcurementWeightModule { }
