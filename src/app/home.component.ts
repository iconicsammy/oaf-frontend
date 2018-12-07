import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "./services/api.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  postform: FormGroup; // to hold our form object
  processDone = false;
  processedData; // to hold processed or original data
  originalData;
  activeChildId = -1; // to show details of each row
  showDetail = ""; // we have different details of a process to show. Payment flow for a single distribution, payment flow for
  // muliple distributions, affected seasons if seasonless payment or effect on a season

  constructor(private api: ApiService, private form_builder: FormBuilder) {
    //
    this.postform = this.form_builder.group({
      content: [null, [Validators.required]]
    });
  }

  paymentSucceed(status) {
    /*
    did the particular payment succeed
    */
    console.log("status ", status);
    if (status === 0) {
      return "No";
    }
    return "Yes";
  }

  displayPaymentDetail(option) {
    /*
    show payment details of choice

    @input option: String. Can be
      PaymentFlow : show payment distribution (i.e. advances)
      SeasonalPaymentEffect: if paid for a specific season, what was the effect on his/her repayment on that specific season?

    Note we pass  no row_id (tr) here because details are contained within one row anyway
      */

    this.showDetail = option;
  }

  filterResults(filter_by) {
    /*
    filter the results by some criteria
    */

    if (filter_by === "failed") {
      this.processedData = this.originalData.filter(data => {
        return data.status === 0;
      });
    } else if (filter_by === "passed") {
      this.processedData = this.originalData.filter(data => {
        return data.status === 1;
      });
    } else if (filter_by === "seasonal") {
      this.processedData = this.originalData.filter(data => {
        return data.distributed === false;
      });
    } else if (filter_by === "seasonless") {
      this.processedData = this.originalData.filter(data => {
        return data.distributed === true;
      });
    } else {
      this.processedData = this.originalData;
    }
  }

  showPaymentDetails(event, row_id) {
    /*
    show details of a specific payment processed
    */

    event.preventDefault();
    this.showDetail = "";

    this.activeChildId = row_id;
  }

  isExtra(status) {
    if (!status) {
      return "No";
    }
    return "Yes";
  }

  isSeasonal(status) {
    /*
    was the farmer paying for a specific season or not?
    */
    if (status == false) {
      return "Yes";
    }
    return "No";
  }

  handleFormSubmission(post) {
    /*
    to process posted data. Simply call the api with the data
    */
    this.processDone = false;
    this.showDetail = "";
    this.processedData = null;
    this.originalData = null;
    this.activeChildId= -1;
    this.api.postPayment(post).subscribe(
      data => {
        console.log(data["detail"]);
        this.processedData = data["detail"];
        this.originalData = data["detail"];
        this.processDone = true;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        try {
          alert(err.error.detail);
        } catch (error) {
          alert("There was something wrong. Provide a valid JSON payment data");
        }
      }
    );
  }

  ngOnInit() {
    console.log("initalized");
  }
}
