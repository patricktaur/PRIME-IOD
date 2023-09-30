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
export class ProjectIssueTrackerService {
  constructor(private http: HttpClient) {}

  getStudyIssueTrackerList(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudyIssueTracker/records/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyIssueTrackerNew(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudyIssueTracker/new/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyIssueTrackerEdit(recId: number) {
    // const api = environment.serverUrl + '/api/tblStudyIssueTracker/edit/' + recId;
    const api = environment.serverUrl + '/api/tblStudyIssueTracker/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addOrUpdateStudyIssueTracker(IssueTrackerRecord: any) {
    const api = environment.serverUrl + '/api/tblStudyIssueTracker/add-or-update/';
    const body = JSON.stringify(IssueTrackerRecord);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteStudyIssueTracker(recId: number) {
    const api = environment.serverUrl + '/api/tblStudyIssueTracker/delete/' + recId;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
