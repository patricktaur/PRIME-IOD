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
export class ImiRaTrackersService {
  constructor(private http: HttpClient) {}
  // getCdsList
  getImiRaDevTaskList(filters: any) {
    const body = JSON.stringify(filters);
    // let api = `${environment.serverUrl}/api/TblDevelopmentTaskRequests/list-s`;
    let api = `${environment.serverUrl}/api/vwIMI_RA_DevelopmentRequestV2/report-list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getImiRaOutputTaskList(filters: any) {
    const body = JSON.stringify(filters);
    // let api = `${environment.serverUrl}/api/TblDevelopmentTaskRequests/list-s`;
    let api = `${environment.serverUrl}/api/vwIMI_RA_OutputRequestV2/report-list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
  //#region
  getImiRaDevpFilters() {
    const api = `${environment.serverUrl}/api/vwIMI_RA_DevelopmentRequestV2/imi-ra-devp-req-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
  getImiRaOutputFilters() {
    const api = `${environment.serverUrl}/api/vwIMI_RA_OutputRequestV2/imi-ra-output-req-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  //#endregion
}
