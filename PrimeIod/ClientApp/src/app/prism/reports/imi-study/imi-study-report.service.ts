import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ImiStudyReportService {
  constructor(private http: HttpClient) {}

  getImiStudyReport(filters: any) {
    const body = JSON.stringify(filters);
    // let api = `${environment.serverUrl}/api/TblIMIStudyReview/review-report`;

    let api = `${environment.serverUrl}/api/vwIMIStudyReviewV2/report-list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getReportColumns() {
    let api = `${environment.serverUrl}/api/vwIMIStudyReviewV2/report-uigrid-s`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
