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
export class StudyCDSOutputReqService {
  constructor(private http: HttpClient) {}

  // getNew(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblExternalData/new/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getRecordToView(recId: number) {
    const api = environment.serverUrl + '/api/TblOutputTaskRequests/record-for-view/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getDashboardView(recId: number) {
    const api = environment.serverUrl + '/api/TblOutputTaskRequests/dashboard-view/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  markAsCompleted(recId: number) {
    const api = environment.serverUrl + '/api/TblOutputTaskRequests/mark-as-completed/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  clone(recId: number) {
    const api = environment.serverUrl + '/api/TblOutputTaskRequests/clone/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
  addOrUpdate(taskRecord: any) {
    const api = environment.serverUrl + '/api/tblExternalData/add-or-update';
    const body = JSON.stringify(taskRecord);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRecord(recId: number) {
    const api = environment.serverUrl + '/api/TblOutputTaskRequests/delete/' + recId;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  //History:
  getHistoryList(developmentTaskId: number) {
    const api = environment.serverUrl + '/api/TblOutputTaskRequests/history-records/' + developmentTaskId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getInstIdAndNames(studyId: number) {
    const api = environment.serverUrl + '/api/TblOutputTaskRequests/instruction-id-names/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
