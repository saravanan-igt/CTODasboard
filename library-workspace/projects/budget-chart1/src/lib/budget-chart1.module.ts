import { NgModule } from '@angular/core';
import { BudgetChart1Component } from './budget-chart1.component';
import {MaterialModule} from './material-module'
import { NgxEchartsModule } from "ngx-echarts";
import {AmountPipe} from './amount.pipe';


@NgModule({
  declarations: [BudgetChart1Component,AmountPipe],
  imports: [
    MaterialModule,
    NgxEchartsModule,
  ],
  exports: [BudgetChart1Component]
})
export class BudgetChart1Module { }
