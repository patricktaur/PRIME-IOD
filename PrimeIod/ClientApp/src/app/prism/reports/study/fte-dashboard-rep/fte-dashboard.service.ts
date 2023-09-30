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
export class FteDashboardService {
  constructor(private http: HttpClient) {}

  // getProjectReviewComplianceReport() {
  //   // let api = `${environment.serverUrl}/api/studyreports/project-review-compliance-report`;
  //   let api = `${environment.serverUrl}/api/VwStudyReviewComplianceV2/report-list`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getProjectReviewComplianceReportCSV() {
  //   let api = `${environment.serverUrl}/api/studyreports/project-review-compliance-report-csv`;
  //   return this.http.get(api, { reportProgress: true, responseType: 'blob' }).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getOMRReport() {
  //   //  let api = `${environment.serverUrl}/api/OMRDashboard/omr-dashboard-report`;
  //   let api = `${environment.serverUrl}/api/VwOMRDashboardV2/report-list`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // // getOMRReportCSV() {

  // //   let api = `${environment.serverUrl}/api/studyreports/omr-dashboard-report-csv`;
  // //   return this.http.get(api,  {reportProgress: true, responseType: 'blob' }).pipe(
  // //     map(response => {
  // //       return response;
  // //     })
  // //   );
  // // }

  // getOMRReportExport() {
  //   let api = `${environment.serverUrl}/api/studyreports/omr-dashboard-report-exp`;
  //   return this.http.get(api, { reportProgress: true, responseType: 'blob' }).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getEdcExperienceByStudyPhaseReport() {
  //   let api = `${environment.serverUrl}/api/EDCExp/report`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getEdcStudyStateBySystemReport() {
  //   let api = `${environment.serverUrl}/api/vwEDCStudyStatusyBySystemV2/report-list`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // //identical colums for
  // getProjectReviewColumns() {
  //   let api = `${environment.serverUrl}/api/vwProjectReviewV2/report-uigrid`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getProjectReviewReport() {
  //   let api = `${environment.serverUrl}/api/vwProjectReviewV2/report-list`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getProjectCurrentReviewReport() {
  //   let api = `${environment.serverUrl}/api/vwProjectCurrentReviewV2/report-list`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyReportWithServerSideFilters(reportName: string, filters: any) {
  //   const body = JSON.stringify(filters);
  //   let api = `${environment.serverUrl}/api/${reportName}/report-list-s`;
  //   return this.http.post(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getStudyFteDashboardReport(filters: any) {
    let api = `${environment.serverUrl}/api/vwStudyFteDashboardV2/report-list`;
    const body = JSON.stringify(filters);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyFteDashboardFilters() {
    let api = `${environment.serverUrl}/api/vwStudyFteDashboardV2/filter`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // getRecordsBasedOnSearch(searchText: string, pageNo: any, pageSize: any) {
  //   const api =
  //     environment.serverUrl +
  //     '/api/tblTaskCategory/search?SearchFor=' +
  //     searchText +
  //     '&pageNo=' +
  //     pageNo +
  //     '&pageSize=' +
  //     pageSize;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       // console.log('in service :' + JSON.stringify(response));
  //       return response;
  //     })
  //   );
  // }

  // getStudyReport(reportName: string) {
  //   let api = `${environment.serverUrl}/api/studyreports/report-list?report=${reportName}`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyReportA(reportName: string) {
  //   let api = `${environment.serverUrl}/api/${reportName}/report-list`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyReportWithServerSideFilters(reportName: string, filters: any) {
  //   const body = JSON.stringify(filters);
  //   let api = `${environment.serverUrl}/api/${reportName}/report-list-s`;
  //   return this.http.post(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // // const api = environment.serverUrl + '/api/tblUser/add';
  // // const body = JSON.stringify(tblUser);
  // // return this.http.post(api, body, httpOptions).pipe(
  // //   map(response => {
  // //     return response;
  // //   })
  // // );

  // getStudyReportUIGrid(reportName: string) {
  //   let api = `${environment.serverUrl}/api/studyreports/report-uigrid?report=${reportName}`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getReportUIGrid(reportName: string) {
  //   let api = `${environment.serverUrl}/api/${reportName}/report-uigrid`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getReportUIGrid_S(reportName: string) {
  //   let api = `${environment.serverUrl}/api/${reportName}/report-uigrid-s`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }
}
