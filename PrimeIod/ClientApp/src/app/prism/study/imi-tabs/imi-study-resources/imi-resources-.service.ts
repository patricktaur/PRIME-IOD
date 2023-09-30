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
export class ImiResourcesService {
  constructor(private http: HttpClient) {}

  getNew(studyId: number) {
    const api = environment.serverUrl + '/api/TblImiresources/new/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordToEdit(recId: number) {
    // const api = environment.serverUrl + '/api/tblStudyIssueTracker/edit/' + recId;
    const api = environment.serverUrl + '/api/TblImiresources/edit/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addOrUpdate(IssueTrackerRecord: any) {
    const api = environment.serverUrl + '/api/TblImiresources/add-or-update';
    const body = JSON.stringify(IssueTrackerRecord);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRecord(recId: number) {
    const api = environment.serverUrl + '/api/TblImiresources/delete/' + recId;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCdplClinicalProgrammerId(studyId: number) {
    const api = environment.serverUrl + '/api/TblImiresourcesXXX/cdpl-clinical-programmer/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  roleResourceOverlapValidator(record: any) {
    const api = environment.serverUrl + '/api/TblImiresources/role-resource-overlap-validator';
    const body = JSON.stringify(record);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
