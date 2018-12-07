import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { APIS } from "../../environments/APIS";

import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  postPayment(post): Observable<any> {
    /*
 post is a json object
  */
    return this.http.post<any[]>(APIS.uploadPayments, post, {
      responseType: "json"
    });
  },

  reportSeasons(): Observable<any> {
    /*
 post is a json object
  */
    return this.http.get<any[]>(APIS.reportSeasons, {
      responseType: "json"
    });
  }

}
