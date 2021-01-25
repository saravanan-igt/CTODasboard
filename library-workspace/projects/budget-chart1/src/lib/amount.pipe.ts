import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "amount",
})
export class AmountPipe implements PipeTransform {
  transform(value: any, args: any): any {
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
    return "$" + tValue.toFixed(args) + " " + suffix[exp - 1];
  }
}