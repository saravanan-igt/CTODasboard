import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: 'app-budget-bar-chart',
  template: `
  <mat-card class="pie-chart-card" [class.cardLess]="cardLess">
  <mat-card-header>
    <mat-card-title>{{ chartTitle }}</mat-card-title>
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
export class BudgetBarChartComponent implements OnInit {
  @Input() seriesData: any;
  @Input()
  chartTitle!: string;
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
   
    position: "right",
    formatter: this.labelFormatter
      ? this.labelFormatter
      : (params: { value: number; }) => {
          let amount =
            params.value <= 0
              ? 0
              : "$" + (params.value / 1000000).toFixed(1) + "M";
          return amount;
        },
    fontSize: 10,
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
        top: "5%",
        bottom: "20%",
        left: this.gridLeft ? this.gridLeft : "10%",
        right: "10%",
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
        data: this.legend ? this.legend : ["Active", "Planned", "Completed"],
        bottom: -5,
      },
      xAxis: [
        {
          type: "value",
          splitNumber: this.xSplitNumber ? this.xSplitNumber : 8,
          axisLine: { show: true },
          nameLocation: "center",
          name: "No. of Projects",
          nameGap: 30,
          axisLabel: {
            formatter: (value: number, index: any) => {
              let amount =
                value <= 0 ? 0 : "$" + (value / 1000000).toFixed(1) + "M";
              return amount;
            },
          },
        },
      ],
      yAxis: [
        {
          type: "category",
          data: ["Lottery", "Casino", "VLT"],
          axisTick: { show: false },
          inverse: true,
          
        },
      ],
      itemStyle: {
        barBorderWidth: 1,
      },
      series: [],
    };

    this.chartOption.series = this.seriesData.map((item: { stack: undefined; label: { show: boolean; position: string; formatter: any; fontSize: number; rich: { name: { textBorderColor: string; }; }; }; }, index: any) => {
      this.labelOption.formatter = this.labelFormatter
        ? this.labelFormatter
        : (params: { value: any; }) => {
            let amount = this.amountTransform(params.value, 1);
            return "$" + amount;
          };
      if (item.stack !== undefined) {
        this.labelOption.position = "inside";
      }
      item.label = this.labelOption;
      
      return item;
    });

    this.chartOption.color = this.color
      ? ["rgb(244,67,54)", "#fec007", "rgba(7,189,55,0.85)"]
      : ["rgb(0,86,184)", "rgb(0,187,211)", "rgb(254,192,7)", "#e08d08"];
    this.chartOption.xAxis[0].axisLabel.formatter = this.yAxisFormat
      ? this.yAxisFormat
      : (value: number, index: any) => {
          return "$" + (value / 1000000).toFixed(0) + "M";
        };
    this.chartOption.yAxis[0].data = this.xAxisData;
    this.chartOption.xAxis[0].name = this.yAxisName;
  }

}

