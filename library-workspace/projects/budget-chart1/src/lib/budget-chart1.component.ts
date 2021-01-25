import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: 'app-budget-chart',
  template: `
  <mat-card class="pie-chart-card" [class.cardLess]="cardLess">
  <mat-card-header>
    <mat-card-title
      >{{ chartTitle }}
      <ng-container *ngIf="totalText">
        : {{ totalValue | amount: 1 }}</ng-container
      ></mat-card-title
    >
  </mat-card-header>
  <mat-card-content>
    <div
      echarts
      [options]="chartOption"
      (chartClick)="chartEvent($event, 'chartClick')"
      class="demo-chart"
      style="width: 100%; height: 200px;"
      [style.height]="height + 'px'"
    ></div>
  </mat-card-content>
</mat-card>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetChart1Component implements OnInit {
  @Input() data: any;
  @Input()
  chartTitle!: string;
  @Input() cardLess: boolean = false;
  @Input() labelFormatter: any;
  @Input() color: any;
  @Input() radius: any;
  @Input() totalText: boolean = true;
  @Input() height: any;
  chartOption:any;
  @Output() onChartEvent = new EventEmitter();

  totalValue: any;
  constructor() { }
  public chartEvent($event: any, type: any) {
    ///$event.seriesData = this.chartSeries[0].data;
    this.onChartEvent.emit($event);
  }

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

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.chartOption = {
      tooltip: {
        trigger: "item",
        textStyle: {
          fontSize: 12,
        },
        formatter: this.chartTitle.includes("Budget")
          ? (params:any) => {
              params.value = parseFloat(params.value);
              let amount = "$" + params.value.toLocaleString();
              return `${params.seriesName} <br/>${params.data.name}: ${amount} (${params.percent}%)`;
            }
          : "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        show: true,
        bottom: -5,
        itemWidth: 12,
        itemHeight: 10,
      },
      series: [
        {
          name: this.chartTitle.includes("Budget")
            ? "Budget"
            : "Total Projects",
          type: "pie",
          left: 0,
          right: 5,
          bottom: 20,
          radius: this.radius
            ? this.radius
            : window.innerWidth < 1199.98
            ? "60%"
            : "70%",
          avoidLabelOverlap: true,
          label: {
            show: true,
            formatter: (params:any) => {
              let amount = this.amountTransform(params.value, 1);
              return "$" + amount;
            },
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
            length: 3,
          },
          itemStyle: {
            borderWidth: this.chartTitle.includes("Budget") ? 0 : 0.5,
            borderColor: "#fff",
          },
          data: this.data,
        },
      ],
      color: [
        "rgba(3,169,243,0.85)",
        "rgba(150,117,206,0.85)",
        "rgba(249,98,98,0.85)",
      ],
    };
    this.chartOption.series[0].data = this.data; //labelFormatter
    this.chartOption.series[0].label.formatter = this.labelFormatter
      ? this.labelFormatter
      : (params:any) => {
          let amount = this.amountTransform(params.value, 1);
          return "$" + amount;
        };
    this.chartOption.color = this.color
      ? ["rgb(244,67,54)", "#fec007", "rgb(7,189,55)"]
      : ["rgb(0,86,184)", "rgb(0,187,211)", "rgb(254,192,7)"];
    this.totalValue = this.data.reduce((acc:any, item:any) => {
      return (acc += item.value);
    }, 0);
  }
}
