import { Injectable } from '@angular/core';
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
export class ImiRaOutReqService {
  constructor(private http: HttpClient) {}

  getRecordToView(recId: number) {
    const api = environment.serverUrl + '/api/TblImiRaOutputRequest/record-for-view/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getDashboardView(recId: number) {
    const api = environment.serverUrl + '/api/TblImiRaOutputRequest/dashboard-view/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  clone(recId: number) {
    const api = environment.serverUrl + '/api/TblImiRaOutputRequest/clone/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRecord(recId: number) {
    const api = environment.serverUrl + '/api/TblImiRaOutputRequest/delete/' + recId;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  processBatchActions(batchActions: any) {
    const api = environment.serverUrl + '/api/TblImiRaOutputRequest/process-batch-actions';
    const body = JSON.stringify(batchActions);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
