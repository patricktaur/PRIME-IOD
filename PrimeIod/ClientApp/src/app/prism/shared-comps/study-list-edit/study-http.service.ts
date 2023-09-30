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
export class StudyHttpService {
  constructor(private http: HttpClient) {}

  getList(studyId: number, controllerName: string, actionName: string = 'records') {
    const api = environment.serverUrl + `/api/${controllerName}/${actionName}/${studyId}`;
    console.log(`api = ${api}`);
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
  getStudyIssueTrackerNew(controllerName: string, studyId: number) {
    const api = environment.serverUrl + `/api/${controllerName}/new/${studyId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyIssueTrackerEdit(controllerName: string, recId: number) {
    // const api = environment.serverUrl + '/api/${controllerName}/edit/' + recId;
    const api = environment.serverUrl + `/api/${controllerName}/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addOrUpdateStudyIssueTracker(controllerName: string, IssueTrackerRecord: any) {
    const api = environment.serverUrl + `/api/${controllerName}/add-or-update/`;
    const body = JSON.stringify(IssueTrackerRecord);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRecord(controllerName: string, recId: number) {
    const api = environment.serverUrl + `/api/${controllerName}/delete/${recId}`;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getNew(controllerName: string, studyId: number) {
    const api = environment.serverUrl + `/api/${controllerName}/new/` + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordToEdit(controllerName: string, studyId: number) {
    const api = environment.serverUrl + `/api/${controllerName}/edit/` + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // addOrUpdate(IssueTrackerRecord: any) {
  //   const api = environment.serverUrl + '/api/tblFteReview/add-or-update/';
  //   const body = JSON.stringify(IssueTrackerRecord);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  addOrUpdate(controllerName: string, record: any) {
    const api = environment.serverUrl + `/api/${controllerName}/add-or-update/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
