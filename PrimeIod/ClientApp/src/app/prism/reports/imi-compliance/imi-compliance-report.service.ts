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
export class ImiComplianceReportService {
  constructor(private http: HttpClient) {}

  getReviewComplianceReport() {
    // let api = `${environment.serverUrl}/api/studyreports/project-review-compliance-report`;
    let api = `${environment.serverUrl}/api/vwImiStudyReviewComplianceV2/report-list`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getReviewComplianceFilters() {
    // let api = `${environment.serverUrl}/api/studyreports/project-review-compliance-report`;
    let api = `${environment.serverUrl}/api/vwImiStudyReviewComplianceV2/report-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
