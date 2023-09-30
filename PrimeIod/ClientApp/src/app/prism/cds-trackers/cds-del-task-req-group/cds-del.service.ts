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
export class CDSDelService {
  constructor(private http: HttpClient) {}

  getCdsDeliveryTaskList(filters: any) {
    const body = JSON.stringify(filters);
    let api = `${environment.serverUrl}/api/vwCDSDeliveryTaskV2/report-list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllDueDashboard() {
    const api = `${environment.serverUrl}/api/TblDeliveryRequests/all-due-dashboard`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getMyDueDashboard() {
    const api = `${environment.serverUrl}/api/TblDeliveryRequests/my-due-dashboard`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getMeAsProgrammerAssignedDueDashboard() {
    const api = `${environment.serverUrl}/api/TblDeliveryRequests/me-as-programmer-dashboard`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  processBatchActions(batchActions: any) {
    const api = environment.serverUrl + '/api/TblDeliveryRequests/process-batch-actions';
    const body = JSON.stringify(batchActions);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  //#endregion
}
