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
export class ImiProjectIssueTrackerService {
  constructor(private http: HttpClient) {}

  getStudyIssueTrackerList(studyId: number) {
    const api = environment.serverUrl + '/api/TblImistudyIssueTracker/records/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyIssueTrackerNew(studyId: number) {
    const api = environment.serverUrl + '/api/TblImistudyIssueTracker/new/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyIssueTrackerEdit(recId: number) {
    // const api = environment.serverUrl + '/api/TblImistudyIssueTracker/edit/' + recId;
    const api = environment.serverUrl + '/api/TblImistudyIssueTracker/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addOrUpdateStudyIssueTracker(IssueTrackerRecord: any) {
    const api = environment.serverUrl + '/api/TblImistudyIssueTracker/add-or-update/';
    const body = JSON.stringify(IssueTrackerRecord);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteStudyIssueTracker(recId: number) {
    const api = environment.serverUrl + '/api/TblImistudyIssueTracker/delete/' + recId;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
