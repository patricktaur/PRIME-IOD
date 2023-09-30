import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
export class ComplianceReportService {
  constructor(private http: HttpClient) {}

  getMisingFormsReport() {
    let api = `${environment.serverUrl}/api/vwComplianceMissingFormsV2/report-list`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getOfflineValidationsReport() {
    let api = `${environment.serverUrl}/api/vwComplianceOfflineValidationsV2/report-list`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  //OfflineValidationsRep:
  getOfflineValidationsRepStudyIdChunks() {
    let api = `${environment.serverUrl}/api/vwComplianceOfflineValidationsRepV2/study-id-chunks`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getOfflineValidationsRepByStudyIds(studyIds: number[]) {
    const body = JSON.stringify(studyIds);
    let api = `${environment.serverUrl}/api/vwComplianceOfflineValidationsRepV2/report-by-study-ids`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  //OfflineValidations:
  getOfflineValidationsStudyIdChunks() {
    let api = `${environment.serverUrl}/api/vwComplianceOfflineValidationsV2/study-id-chunks`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getOfflineValidationsByStudyIds(studyIds: number[]) {
    const body = JSON.stringify(studyIds);
    let api = `${environment.serverUrl}/api/vwComplianceOfflineValidationsV2/report-by-study-ids`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getProjectReviewComplianceReportCSV() {
    let api = `${environment.serverUrl}/api/studyreports/project-review-compliance-report-csv`;
    return this.http.get(api, { reportProgress: true, responseType: 'blob' }).pipe(
      map(response => {
        return response;
      })
    );
  }

  getOMRReport() {
    //  let api = `${environment.serverUrl}/api/OMRDashboard/omr-dashboard-report`;
    let api = `${environment.serverUrl}/api/VwOMRDashboardV2/report-list`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // getOMRReportCSV() {

  //   let api = `${environment.serverUrl}/api/studyreports/omr-dashboard-report-csv`;
  //   return this.http.get(api,  {reportProgress: true, responseType: 'blob' }).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getOMRReportExport() {
    let api = `${environment.serverUrl}/api/studyreports/omr-dashboard-report-exp`;
    return this.http.get(api, { reportProgress: true, responseType: 'blob' }).pipe(
      map(response => {
        return response;
      })
    );
  }

  getEdcExperienceByStudyPhaseReport() {
    let api = `${environment.serverUrl}/api/EDCExp/report`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getEdcStudyStateBySystemReport() {
    let api = `${environment.serverUrl}/api/vwEDCStudyStatusyBySystemV2/report-list`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // return this.httpClient.request(new HttpRequest(
  //   'GET',
  //   `${this.apiDownloadUrl}?file=${file}`,
  //   null,
  //   {
  //     reportProgress: true,
  //     responseType: 'blob'
  //   }));

  getRecordsBasedOnSearch(searchText: string, pageNo: any, pageSize: any) {
    const api =
      environment.serverUrl +
      '/api/tblTaskCategory/search?SearchFor=' +
      searchText +
      '&pageNo=' +
      pageNo +
      '&pageSize=' +
      pageSize;
    return this.http.get(api).pipe(
      map(response => {
        // console.log('in service :' + JSON.stringify(response));
        return response;
      })
    );
  }

  getStudyReport(reportName: string) {
    let api = `${environment.serverUrl}/api/studyreports/report-list?report=${reportName}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyReportA(reportName: string) {
    let api = `${environment.serverUrl}/api/${reportName}/report-list`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyReportUIGrid(reportName: string) {
    let api = `${environment.serverUrl}/api/studyreports/report-uigrid?report=${reportName}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyReportUIGridA(reportName: string) {
    let api = `${environment.serverUrl}/api/${reportName}/report-uigrid`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
