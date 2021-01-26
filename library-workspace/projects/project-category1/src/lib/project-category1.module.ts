import { NgModule } from '@angular/core';
import { ProjectCategory1Component } from './project-category1.component';
import { ProjectCategory1Service } from './project-category1.service';
import {MaterialModule} from './material-module';
import { NgxEchartsModule } from "ngx-echarts";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [ProjectCategory1Component],
  imports: [
    MaterialModule,
    NgxEchartsModule,
    NgbModule,
    CommonModule
  ],
  providers:[ProjectCategory1Service],
  exports: [ProjectCategory1Component]
})
export class ProjectCategory1Module { }

