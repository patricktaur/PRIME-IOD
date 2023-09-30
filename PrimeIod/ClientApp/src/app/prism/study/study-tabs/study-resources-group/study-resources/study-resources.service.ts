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
export class StudyResourcesService {
  constructor(private http: HttpClient) {}

  // getStudyResources(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudyResources/ResourcesList/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getNew(studyId: number) {
    const api = environment.serverUrl + '/api/TblStudyResources/new/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordToEdit(recId: number) {
    // const api = environment.serverUrl + '/api/tblStudyIssueTracker/edit/' + recId;
    const api = environment.serverUrl + '/api/TblStudyResources/edit/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addOrUpdate(IssueTrackerRecord: any) {
    const api = environment.serverUrl + '/api/TblStudyResources/add-or-update/';
    const body = JSON.stringify(IssueTrackerRecord);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRecord(recId: number) {
    const api = environment.serverUrl + '/api/TblStudyResources/delete/' + recId;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCdplClinicalProgrammerId(studyId: number) {
    const api = environment.serverUrl + '/api/TblStudyResources/cdpl-clinical-programmer/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getActiveResournces(studyId: number) {
    const api = environment.serverUrl + '/api/TblStudyResources/study-active-resources/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  roleResourceOverlapValidator(record: any) {
    const api = environment.serverUrl + '/api/TblStudyResources/role-resource-overlap-validator/';
    const body = JSON.stringify(record);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
