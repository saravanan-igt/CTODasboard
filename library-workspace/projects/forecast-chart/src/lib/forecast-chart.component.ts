import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: 'app-forecast-chart',
  template: `
  <mat-card class="pie-chart-card" [class.cardLess]="cardLess">
  <mat-card-header>
    <mat-card-title
      >Cost Planning vs Current Forecast
      <span *ngIf="chartTitle">- {{ chartTitle }}</span></mat-card-title
    >
  </mat-card-header>
  <mat-card-content>
    <div
      echarts
      [options]="chartOption"
      class="demo-chart"
      style="width: 100%; height: 250px;"
      [style.height]="height + 'px'"
    ></div>
  </mat-card-content>
</mat-card>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastChartComponent implements OnInit {
  @Input() seriesData: any;
  @Input() chartTitle: string = "";
  @Input() cardLess: boolean = false;
  @Input() labelFormatter: any=0;
  @Input() color: any;
  @Input() yAxisFormat: any;
  @Input()
  yAxisName!: string;
  @Input() xAxisData: any;
  @Input() height: any;
  @Input() legend: any;
  @Input() gridLeft: any;
  @Input() xSplitNumber: any;

  labelOption = {
    show: true,
    // rotate: 90,
    // position: "right",
    formatter: this.labelFormatter
      ? this.labelFormatter
      : (params:any) => {
          let amount = this.amountTransform(params.value, 1);
          return "$" + amount;
        },
    fontSize: 11,
    fontWeight: "500",
    fontFamily: "Roboto",
    rich: {
      name: {
        textBorderColor: "#fff",
      },
    },
  };

  chartOption: any;

  totalProjects: any;

  amountTransform(value: any, args: any): any {
    let exp,
      suffix = ["k", "M", "B", "T", "P", "E"];
    if (Number.isNaN(value)) {
      return null;
    }
    if (value < 1000) {
      return value;
    }
    exp = Math.floor(Math.log(value) / Math.log(1000));
    let tValue = value / Math.pow(1000, exp);
    tValue = isNaN(tValue) || tValue < 0 ? 0 : tValue;
    return tValue.toFixed(args) + " " + suffix[exp - 1];
  }
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.chartOption = {
      color: [
        "rgba(63,81,181,0.75)",
        "rgba(233,30,99,0.75)",
        "rgba(0,188,212,0.75)",
      ],
      grid: {
        top: "10%",
        bottom: "20%",
        left: this.gridLeft ? this.gridLeft : "10%",
        right: "5%",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          fontSize: 12,
        },
      },
      legend: {
        // data: this.legend ? this.legend : ["Active", "Planned", "Closed"],
        bottom: -5,
      },
      xAxis: [
        {
          type: "category",
          data: this.xAxisData
            ? this.xAxisData
            : [
                "Lottery Active",
                "Lottery Completed",
                "Casino Active",
                "Casino Completed",
                "VLT Active",
                "VLT Completed",
              ],
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: (value: number, index: any) => {
              let amount =
                value <= 0 ? 0 : "$" + (value / 1000000).toFixed(1) + "M";
              return amount;
            },
          },
          // name: "Budget",
          // nameLocation: "center",
          // nameGap: 45,
          // nameRotate: 90,
        },
      ],
      itemStyle: {
        barBorderWidth: 1,
      },
      series: [],
    };

    this.chartOption.series = this.seriesData.map((item:any, index:any) => {
      item.label = this.labelOption;
      if (index === 1) {
        item.label = {
          ...item.label,
          color: "#000",
        };
      }
      item.barMaxWidth = 60;
      return item;
    });

    this.chartOption.color = [
      "#e5163c",
      "rgb(0,187,211)",
      // "rgb(0,86,184)",
      // "rgb(254,192,7)",
      // "#e08d08",
    ];
  }
}
