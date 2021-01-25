import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,HostListener
} from "@angular/core";
import { delay } from 'rxjs/operators';
import { ProjectCategory1Service } from "./project-category1.service";
@Component({
  selector: 'app-project-category',
  template: `
  <mat-card class="pie-chart-card">
  <mat-card-header>
    <mat-card-title>{{ chartTitle }}</mat-card-title>
    <button
    *ngIf="info"
    type="button"
    mat-icon-button
    class="info-btn"
    [ngbPopover]="tooltipContent"
    triggers="mouseenter:mouseleave"
    >
      <mat-icon fontSet="material-icons-outlined">info</mat-icon>
    </button>
    
  </mat-card-header>
  <mat-card-content>
    <div
      echarts
      [options]="chartOption"
      class="demo-chart"
      (chartInit)="onChartInit($event)"
      style="width: 100%; height: 150px;"
      [style.height]="height + 'px'"
    ></div>
    <p class="total-text">{{ totalProjects }}</p>
  </mat-card-content>
</mat-card>
<ng-template #tooltipContent>
  <div [innerHTML]="info"></div>
</ng-template>


  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCategory1Component implements OnInit {
  @Input() data: any;
  @Input()
  chartTitle!: string;
  @Input() height: any;
  @Input() info: any;
  chartOption:any;
  echartsInstance:any;
  totalProjects:any;
  constructor( public commonService: ProjectCategory1Service) { }

  ngOnInit(): void {
    this.commonService.getChangeEmitter().pipe(
      delay(500)
    ).subscribe((item: string) => {
        if(item==="clicked" && this.echartsInstance){
          this.echartsInstance.resize();
        }
      })
  }
  onChartInit(ec: any) {
    this.echartsInstance = ec;
  }
  ngOnChanges() {
    this.chartOption = {
      tooltip: {
        trigger: "item",
        textStyle: {
          fontSize: 12,
        },
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        show: true,
        bottom: -5,
        itemWidth: 12,
        itemHeight: 10,
      },
      series: [
        {
          name: "Total Projects",
          type: "pie",
          top: "2%",
          left: 0,
          right: 0,
          bottom: "20%",
          radius: ["50%", "80%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            formatter: "{@2012}",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "15",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
            length: 6,
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: "#fff",
          },
          data: this.data,
        },
      ],
      color: ["rgb(0,86,184)", "rgb(0,187,211)", "rgb(254,192,7)"],
    };
    this.chartOption.series[0].data = this.data;
    this.totalProjects = this.data.reduce((acc:any, item:any) => {
      let value = item.name !== "Total" ? item.value : 0;
      return (acc += value);
    }, 0);
  }


}
