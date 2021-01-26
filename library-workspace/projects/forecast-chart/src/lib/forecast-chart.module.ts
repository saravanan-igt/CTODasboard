import { NgModule } from '@angular/core';
import { ForecastChartComponent } from './forecast-chart.component';
import {MaterialModule} from './material-module'
import { NgxEchartsModule } from "ngx-echarts";
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [ForecastChartComponent],
  imports: [
    MaterialModule,
    NgxEchartsModule,
    CommonModule
  ],
  exports: [ForecastChartComponent]
})
export class ForecastChartModule { }

