import { Component, OnInit } from "@angular/core";
import { ApiService } from "./services/api.service";
import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: "app-report-seasons",
  templateUrl: "./report-seasons.component.html",
  styleUrls: ["./report-seasons.component.css"]
})
export class ReportSeasonsComponent implements OnInit {
  processedData = [];

  constructor(private api: ApiService) {}

  rePaymentStatus(totalCredit, totalRepaid) {
    const diff = totalCredit - totalRepaid;
    if (diff < 0) {
      // we awe customers this amount for the season
      return "+" + -1 * diff;
    } else if (diff == 0) {
      // we are even
      return diff;
    } else {
      // we need this much
      return -1 * diff;
    }
  }

  generateReport() {
    /*
    to process posted data. Simply call the api with the data
    */
    this.processedData = [];
    this.api.reportSeasons().subscribe(
      data => {
        this.processedData = data["detail"];
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        try {
          alert(err.error.detail);
        } catch (error) {
          alert("There was something wrong. ");
        }
      }
    );
  }

  ngOnInit() {}
}
