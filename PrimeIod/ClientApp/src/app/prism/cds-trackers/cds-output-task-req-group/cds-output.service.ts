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
export class CDSOutputService {
  constructor(private http: HttpClient) {}

  getCdsOutputTaskList(filters: any) {
    const body = JSON.stringify(filters);
    let api = `${environment.serverUrl}/api/vwCDSOutputTaskV2/report-list-s`;
    return this.http.post(api, body, httpOptions).pipe(
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

  //   [HttpGet ("all-due-dashboard")]
  //  [HttpGet ("my-due-dashboard")]
  //  [HttpGet ("me-as-programmer-dashboard")]

  getAllDueDashboard() {
    const api = `${environment.serverUrl}/api/TblOutputTaskRequests/all-due-dashboard`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getMyDueDashboard() {
    const api = `${environment.serverUrl}/api/TblOutputTaskRequests/my-due-dashboard`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getMeAsProgrammerAssignedDueDashboard() {
    const api = `${environment.serverUrl}/api/TblOutputTaskRequests/me-as-programmer-dashboard`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  processBatchActions(batchActions: any) {
    const api = environment.serverUrl + '/api/TblOutputTaskRequests/process-batch-actions';
    const body = JSON.stringify(batchActions);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  //#endregion
}
