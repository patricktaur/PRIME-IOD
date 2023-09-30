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
export class CrmStudyRequestService {
  constructor(private http: HttpClient) {}

  getCrmStudyRequestAllRecords() {
    //alert("reached");
    let api = `${environment.serverUrl}/api/TblCrmStudyRequest/getall`;
   //let api = `${environment.serverUrl}/api/TblRequestStudy/dm-request-list`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getNewRecordModule() {
    const api = environment.serverUrl + `/api/TblCrmStudyRequest/new/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyRequestForEdit(recId: number) {
    // const api = environment.serverUrl + '/api/${controllerName}/edit/' + recId;
    const api = environment.serverUrl + `/api/TblCrmStudyRequest/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addOrUpdateStudyRequest(record: any) {
   // alert("reached");
    const api = environment.serverUrl + `/api/TblCrmStudyRequest/add-or-update/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteStudyRequest(recId: number) {
    const api = environment.serverUrl + `/api/TblCrmStudyRequest/delete/${recId}`;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

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

  submitForApproval(record: any) {
    const api = environment.serverUrl + `/api/TblCrmStudyRequest/submit-for-approval/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  withdraw(record: any) {
    const api = environment.serverUrl + `/api/TblCrmStudyRequest/withdraw/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  approve(record: any) {
    const api = environment.serverUrl + `/api/TblCrmStudyRequest/approve/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
  reject(record: any) {
    const api = environment.serverUrl + `/api/TblCrmStudyRequest/reject/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
  undoReject(record: any) {
    const api = environment.serverUrl + `/api/TblCrmStudyRequest/undo-reject/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  iconNumberExists(firstIconNumber: string, secondIconNumber: string) {
    const api =
      environment.serverUrl + `/api/TblStudy/study-icon-numbers-exists/${firstIconNumber}/${secondIconNumber}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
