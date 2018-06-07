import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartStackXStringComponent } from './chart.stack.x.string/chart.stack.x.string.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ChartStackXStringComponent],
  exports: [ChartStackXStringComponent]
})
export class IaD3Module {}
