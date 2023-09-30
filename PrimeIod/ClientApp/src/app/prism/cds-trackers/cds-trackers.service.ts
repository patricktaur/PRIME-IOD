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
export class CDSTrackersService {
  constructor(private http: HttpClient) {}
  // getCdsList
  getCdsDevelopmentTaskList(filters: any) {
    const body = JSON.stringify(filters);
    // let api = `${environment.serverUrl}/api/TblDevelopmentTaskRequests/list-s`;
    let api = `${environment.serverUrl}/api/vwCDSDevelopmentTaskV2/report-list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  // getCdsValidationTaskList(filters: any) {
  //   const body = JSON.stringify(filters);
  //   // let api = `${environment.serverUrl}/api/TblDevelopmentTaskRequests/list-s`;
  //   let api = `${environment.serverUrl}/api/vwCDSValidationTaskV2/list-s`;
  //   return this.http.post(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getCdsCodingTaskList(filters: any) {
    const body = JSON.stringify(filters);
    // let api = `${environment.serverUrl}/api/TblDevelopmentTaskRequests/list-s`;
    let api = `${environment.serverUrl}/api/vwCDSCodingTaskV2/list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCdsInstructionTaskList(filters: any) {
    const body = JSON.stringify(filters);
    let api = `${environment.serverUrl}/api/vwCDSInstructionTaskV2/list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
  //#region
  getCdsCodingTrackerFilters() {
    const api = `${environment.serverUrl}/api/vwCDSCodingTaskV2/cds-task-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCdsDevelopmentTrackerFilters() {
    const api = `${environment.serverUrl}/api/vwCDSDevelopmentTaskV2/cds-devp-task-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCdsDeliveryTrackerFilters() {
    const api = `${environment.serverUrl}/api/vwCDSDeliveryTaskV2/cds-task-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCdsOutputTrackerFilters() {
    const api = `${environment.serverUrl}/api/vwCDSOutputTaskV2/cds-task-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCdsInstructionTrackerFilters() {
    const api = `${environment.serverUrl}/api/vwCDSInstructionTaskV2/cds-task-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCdsDevStatusDashboard(tag: string) {
    //  userId = userId == 0 ? -1 : userId;

    const api = `${environment.serverUrl}/api/TblDevelopmentTaskRequests/status-dashboard-abcd/${tag}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  //   [HttpGet ("all-due-dashboard")]
  //  [HttpGet ("my-due-dashboard")]
  //  [HttpGet ("me-as-programmer-dashboard")]

  getCdsOutDueDashboard() {
    const api = `${environment.serverUrl}/api/XXX/XXX`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  //#endregion
}
