import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
// import { templateJitUrl } from '@angular/compiler';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequestsIMIStudyService {
  constructor(private http: HttpClient) {}

  // getStudyRequestsList() {
  //   let api = `${environment.serverUrl}/api/TblRequestStudy`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getImiStudyRequestsList() {
    let api = `${environment.serverUrl}/api/TblRequestStudy/imi-request-list`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getImiStudyRequestNew() {
    const api = environment.serverUrl + `/api/TblRequestStudy/imi-new/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyRequestForEdit(recId: number) {
    // const api = environment.serverUrl + '/api/${controllerName}/edit/' + recId;
    const api = environment.serverUrl + `/api/TblRequestStudy/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyEditForIMI(studyId: number) {
    // const api = environment.serverUrl + '/api/${controllerName}/edit/' + recId;
    const api = environment.serverUrl + `/api/TblRequestStudy/imi-study-edit/${studyId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addOrUpdateStudyRequest(record: any) {
    const api = environment.serverUrl + `/api/TblRequestStudy/add-or-update/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteStudyRequest(recId: number) {
    const api = environment.serverUrl + `/api/TblRequestStudy/delete-request/${recId}`;
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
    const api = environment.serverUrl + `/api/TblRequestStudy/submit-for-approval/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveIMIStudyEdit(record: any) {
    const api = environment.serverUrl + `/api/TblRequestStudy/save-imi-study-edit/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  withdraw(record: any) {
    const api = environment.serverUrl + `/api/TblRequestStudy/withdraw/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  imiApprove(record: any) {
    const api = environment.serverUrl + `/api/TblRequestStudy/imi-approve/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
  reject(record: any) {
    const api = environment.serverUrl + `/api/TblRequestStudy/reject/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
  undoReject(record: any) {
    const api = environment.serverUrl + `/api/TblRequestStudy/undo-reject/`;
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

  iconNumberandStudyIdExists(firstIconNumber: string, secondIconNumber: string,studyId : number) {
    const api =
      environment.serverUrl + `/api/TblStudy/study-icon-numbers-studyid-exists/${firstIconNumber}/${secondIconNumber}/${studyId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
