import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "[app-payment-flow]",
  templateUrl: "./payment-flow.component.html",
  styleUrls: ["./payment-flow.component.css"]
})
export class PaymentFlowComponent implements OnInit {
  @Input() data;
  display = false;
  optimizedData = [];
  constructor() {}

  isExtra(status) {
    if (!status) {
      return "No";
    }
    return "Yes";
  }

  ngOnInit() {
    const len = this.data.length;

    if (len === 1) {
      this.optimizedData.push({
        SeasonID: this.data[0].SeasonID,
        positive: this.data[0].amount,
        negative: 0,
        added: this.data[0].amount,
        extra: this.data[0].extra
      });
    } else if (len > 1) {
      const moves = this.data.slice(0, len - 1);
      for (let counter = 0; counter < moves.length; counter++) {
        this.optimizedData.push({
          SeasonID: moves[counter].SeasonID,
          positive: moves[counter].amount,
          negative: moves[counter + 1].amount,
          added: moves[counter].amount + moves[counter + 1].amount,
          extra: moves[counter].extra
        });
        counter++;
      }

      this.optimizedData.push({
        SeasonID: this.data[len - 1].SeasonID,
        positive: this.data[len - 1].amount,
        negative: 0,
        added: this.data[len - 1].amount,
        extra: this.data[len - 1].extra
      });

      this.display = true;
    }
  }
}
