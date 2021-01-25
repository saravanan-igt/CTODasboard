import { NgModule } from '@angular/core';
import { ForecastChartComponent } from './forecast-chart.component';
import {MaterialModule} from './material-module'
import { NgxEchartsModule } from "ngx-echarts";

@NgModule({
  declarations: [ForecastChartComponent],
  imports: [
    MaterialModule,
    NgxEchartsModule
  ],
  exports: [ForecastChartComponent]
})
export class ForecastChartModule { }
