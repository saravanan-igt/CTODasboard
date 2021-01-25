import { NgModule } from '@angular/core';
import { BudgetBarChartComponent } from './budget-bar-chart.component';
import {MaterialModule} from './material-module';
import { NgxEchartsModule } from "ngx-echarts";


@NgModule({
  declarations: [BudgetBarChartComponent],
  imports: [
    MaterialModule,
    NgxEchartsModule
  ],
  exports: [BudgetBarChartComponent]
})
export class BudgetBarChartModule { }