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
export class CDSCodingService {
  constructor(private http: HttpClient) {}

  getCdsCodingTaskList(filters: any) {
    const body = JSON.stringify(filters);
    // let api = `${environment.serverUrl}/api/TblDevelopmentTaskRequests/list-s`;
    let api = `${environment.serverUrl}/api/vwCDSCodingTaskV2/report-list-s`;
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

  //#endregion
}
