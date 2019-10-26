import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementCheckListComponent } from './procurement-check-list/procurement-check-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [ProcurementCheckListComponent],
  imports: [
    CommonModule
  ]
})
export class ProcurementCheckModule { }
