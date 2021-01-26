import { NgModule } from '@angular/core';
import { BudgetBarChartComponent } from './budget-bar-chart.component';
import {MaterialModule} from './material-module';
import { NgxEchartsModule } from "ngx-echarts";
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BudgetBarChartComponent],
  imports: [
    MaterialModule,
    NgxEchartsModule,
    CommonModule
  ],
  exports: [BudgetBarChartComponent]
})
export class BudgetBarChartModule { }