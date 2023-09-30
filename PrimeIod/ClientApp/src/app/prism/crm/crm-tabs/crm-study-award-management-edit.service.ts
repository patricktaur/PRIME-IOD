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
export class CrmStudyAwardManagementEditService {
  controllerName = 'TblCrmStudyAward';
  constructor(private http: HttpClient) {}

  // const api = `${environment.serverUrl}/api/account/users/${pageNo}/${pageSize}`;

  getRecordForEdit(studyId: number) {
    // const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/edit/${studyId}/`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordForView(studyId: number) {
    // const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/view/${studyId}/`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  update(studyId: number, tempData: any) {
    // const api = environment.serverUrl + '/api/tblStudy/save-study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/update`;
    const body = JSON.stringify(tempData);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}