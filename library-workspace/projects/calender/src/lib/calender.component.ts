import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'lib-calender',
  templateUrl: "./calender.component.html",
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalenderComponent implements OnInit,OnChanges {
 @Input()
  public scheduleData: any[] = [];
  @Input()
  public calendarTitle!: string;
  @Input() public legends: boolean = false;
  @Input()
  public ragState!: string;
  @Input() ragFilter: boolean = false;
  @Input() businessFilter: string = "";

  public months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  public pageTitle: string = "Projects Go-Live Calendar";
  public displayedColumns: string[] = [];

  public calendarData: any[] = [];

  public createColumns() {
    let currentDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    let endDate = new Date(new Date().setMonth(new Date().getMonth() + 18));
    let arr = [];
    while (currentDate <= endDate) {
      arr.push(
        this.months[currentDate.getMonth()] +
          "'" +
          String(currentDate.getFullYear()).charAt(2) +
          String(currentDate.getFullYear()).charAt(3)
      );
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return arr;
  }

  public createDataSource(item: { [x: string]: any; LiveDate: string; Project: any; Component: any; }) {
    let obj :any= {},
      liveDate =
        this.months[Number(item.LiveDate.split("/")[0]) - 1] +
        "'" +
        item.LiveDate.split("/")[2];
    this.displayedColumns = ["Project", ...this.createColumns()];
    this.displayedColumns.map((col) => {
      if (col !== "Project") {
        obj[col] = col == liveDate ? "arrow_drop_up" : "";
      } else {
        obj[col] = item.Project;
        obj["liveDate"] = item.LiveDate;
        obj["component"] = item.Component;
        obj["workStatus"] = item["RAG"];
        obj["BusinessType"] = item["BusinessType"];
        obj["ID"] = item["ID"] !== undefined ? item["ID"] : item["PROJECT_ID"];
        obj["ProjectURL"] = item["ProjectURL"] ? item["ProjectURL"] : null;
        // obj["ProjectURL"] = item["ProjectURL"]
        //   ? "https://clarity.igt.com:8043/niku/nu#action:odf.projectstatusProperties&grandparent_odf_view&odf_concrete_parent_object_code=project&odf_pk=6443020&odf_code=projectstatus&ui.page.space=mainnav.work&parent_odf_view=projectCreate.subObjList.projectstatus"
        //   : null;

        // obj["ProjectURL"] = item["ProjectURL"]
        //   ? "https://clarity.igt.com:8043/niku/nu#action:projmgr.projectDefaultTab&id=" +
        //     item["ProjectURL"]
        //   : null;
        // obj["ProjectURL"] = item["ProjectURL"]
        //   ? "http://clarity.igt.com/niku/nu#action:odf.projectstatusProperties&grandparent_odf_view&odf_concrete_parent_object_code=project&odf_pk=" +
        //     item["ProjectURL"] +
        //     "&odf_code=projectstatus&ui.page.space=mainnav.work&parent_odf_view=projectCreate.subObjList.projectstatus"
        //   : null;
      }
    });

    return obj;
  }

  isSticky(column: string): boolean {
    return column === "Project" ? true : false;
  }
  constructor() {}
  ragStatus = "All";
  businessStatus = "All";
  ragList = [
    { value: "All", viewValue: "All" },
    { value: "R", viewValue: "Red" },
    { value: "A", viewValue: "Amber" },
    { value: "G", viewValue: "Green" },
  ];
  businessVerticals: { value: string; viewValue: string; }[] = [];

  goToStatusLink(url: string) {
    window.open(url, "_blank");
  }

  filterChange() {
    let businessKey = this.businessFilter.split("|");
    let cData = [...this.scheduleData],
      fData;
    if (this.ragStatus !== "All" && this.businessStatus !== "All") {
      fData = cData
        .filter((item) => item.RAG === this.ragStatus)
        .filter((item) => {
          return item[businessKey[0]] !== undefined
            ? item[businessKey[0]] === this.businessStatus
            : item[businessKey[1]] === this.businessStatus;
        });
    }
    if (this.ragStatus === "All" && this.businessStatus !== "All") {
      fData = cData
        .filter((item) => item.RAG !== this.ragStatus)
        .filter((item) => {
          return item[businessKey[0]] !== undefined
            ? item[businessKey[0]] === this.businessStatus
            : item[businessKey[1]] === this.businessStatus;
        });
    }
    if (this.businessStatus === "All" && this.ragStatus !== "All") {
      fData = cData
        .filter((item) => item.RAG === this.ragStatus)
        .filter((item) => {
          return item[businessKey[0]] !== undefined
            ? item[businessKey[0]] !== this.businessStatus
            : item[businessKey[1]] !== this.businessStatus;
        });
    }
    if (this.businessStatus === "All" && this.ragStatus === "All") {
      fData = cData
        .filter((item) => item.RAG !== this.ragStatus)
        .filter((item) => {
          return item[businessKey[0]] !== undefined
            ? item[businessKey[0]] !== this.businessStatus
            : item[businessKey[1]] !== this.businessStatus;
        });
    }

    this.createTableData(fData);
  }
  onRagChange(value: string) {
    this.ragStatus = value;
    this.filterChange();
  }
  onBusinessChange(value: string) {
    this.businessStatus = value;
    this.filterChange();
  }

  createTableData(data: any[] | undefined) {
    if (data !== undefined) {
      let resData = data
        .map((item: { LiveDate1: number; LiveDate: { split: (arg0: string) => number[]; }; }) => {
          item.LiveDate1 = new Date(
            20 + item.LiveDate.split("/")[2],
            item.LiveDate.split("/")[0] - 1,
            item.LiveDate.split("/")[1]
          ).getTime();
          return item;
        })
        .filter(
          (item: { LiveDate1: number; }) =>
            new Date().getTime() < item.LiveDate1 &&
            item.LiveDate1 <
              new Date(
                new Date().setMonth(new Date().getMonth() + 18)
              ).getTime()
        );
      resData.sort((a: { LiveDate1: any; }, b: { LiveDate1: any; }) => {
        var nameA = a.LiveDate1,
          nameB = b.LiveDate1;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      this.calendarData = resData.map((item: any) => this.createDataSource(item));
    }
  }

  ngOnInit() {
    console.log("scheduleData",this.scheduleData)
    this.businessVerticals = this.businessFilter.includes("vertical")
      ? [
          { value: "All", viewValue: "All" },
          { value: "Lottery", viewValue: "Lottery" },
          { value: "Casino", viewValue: "Casino" },
          { value: "VLT", viewValue: "VLT" },
        ]
      : [
          { value: "All", viewValue: "All" },
          { value: "SV", viewValue: "SV" },
          { value: "SD", viewValue: "SD" },
          { value: "PD", viewValue: "PD" },
        ];
  }

  ngOnChanges() {
    if (this.scheduleData !== undefined) {
      this.createTableData(this.scheduleData);
    }
  }
}
