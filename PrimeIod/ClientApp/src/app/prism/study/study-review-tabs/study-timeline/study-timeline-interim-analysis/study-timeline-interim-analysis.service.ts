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
export class StudyTimeLineInterimAnalysisService {
  constructor(private http: HttpClient) {}

  // getList(studyId: number) {
  //   const api = environment.serverUrl + '/api/TblStudyTimelineInterimAnalysis/list/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getNew(studyId: number) {
    const api = environment.serverUrl + '/api/TblStudyTimelineInterimAnalysis/new/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordToEdit(recId: number) {
    // const api = environment.serverUrl + '/api/tblStudyIssueTracker/edit/' + recId;
    const api = environment.serverUrl + '/api/TblStudyTimelineInterimAnalysis/edit/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addOrUpdate(IssueTrackerRecord: any) {
    const api = environment.serverUrl + '/api/TblStudyTimelineInterimAnalysis/add-or-update';
    const body = JSON.stringify(IssueTrackerRecord);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRecord(recId: number) {
    const api = environment.serverUrl + '/api/TblStudyTimelineInterimAnalysis/delete/' + recId;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
