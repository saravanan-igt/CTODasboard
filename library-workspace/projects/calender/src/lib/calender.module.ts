import { NgModule } from '@angular/core';
import { CalenderComponent } from './calender.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CdkTableModule } from "@angular/cdk/table";
@NgModule({
  declarations: [CalenderComponent],
  imports: [
    CommonModule,
    MatCardModule,
    NgbModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,MatDialogModule,MatDividerModule,MatExpansionModule,MatGridListModule,
    MatIconModule,MatInputModule,MatListModule,MatMenuModule,MatNativeDateModule,MatRippleModule,
    MatPaginatorModule,MatProgressBarModule,MatProgressSpinnerModule,MatRadioModule,MatSelectModule,
    MatSidenavModule,MatSliderModule,MatSlideToggleModule,MatSortModule,MatTableModule,MatTabsModule,
    MatToolbarModule,MatTooltipModule,CdkTableModule
  ],
  exports: [CalenderComponent]
})
export class CalenderModule { }
