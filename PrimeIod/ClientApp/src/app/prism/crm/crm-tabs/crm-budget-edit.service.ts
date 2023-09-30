import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Router, ActivatedRoute } from '@angular/router';
let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CrmBudgetEditService {
  controllerName = 'TblCrmBudget';
  constructor(private http: HttpClient) {}

  // const api = `${environment.serverUrl}/api/account/users/${pageNo}/${pageSize}`;

  getCrmStudyRequestAllRecords(studyId: number) {
    //alert("reached");
    let api = `${environment.serverUrl}/api/${this.controllerName}/getall/${studyId}/`;
    //let api = `${environment.serverUrl}/api/TblRequestStudy/dm-request-list`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordForEdit(studyId: number, recId: number) {
    // const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/records/${studyId}/${recId}/`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getNewRecordModule(studyId: number) {
    // const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/newrecord/${studyId}/`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  update(studyId: number, TempData: any) {
    // const api = environment.serverUrl + '/api/tblStudy/save-study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/update`;
    const body = JSON.stringify(TempData);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteBudget(recId: number) {
    const api = environment.serverUrl + `/api/${this.controllerName}/delete/${recId}`;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
