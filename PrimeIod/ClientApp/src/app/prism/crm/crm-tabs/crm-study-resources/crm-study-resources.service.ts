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
export class CrmStudyResourcesService {
  controllerName = 'TblCrmStudyResources';
  constructor(private http: HttpClient) {}

  // const api = `${environment.serverUrl}/api/account/users/${pageNo}/${pageSize}`;

  // getNew(studyId: number) {
  //   // const api = environment.serverUrl + '/api/TblStudyResources/new/' + studyId;
  //   const api = `${environment.serverUrl}/api/${this.controllerName}/new/${studyId}' ;

  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getList(studyId: number) {
    // const api = environment.serverUrl + `/api/${controllerName}/${actionName}/${studyId}`;
    const api = `${environment.serverUrl}/api/${this.controllerName}/records/${studyId}`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getNew(studyId: number) {
    // const api = environment.serverUrl + '/api/TblStudyResources/new/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/new/${studyId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordToEdit(recId: number) {
    // const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/edit/${recId}/`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  roleResourceOverlapValidator(record: any) {
    // const api = environment.serverUrl + '/api/TblStudyResources/role-resource-overlap-validator/';
    const api = `${environment.serverUrl}/api/${this.controllerName}/role-resource-overlap-validato/`;

    const body = JSON.stringify(record);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  // update(studyId: number, studyAssumptionsDTO: any) {
  //   // const api = environment.serverUrl + '/api/tblStudy/save-study-local-lab/' + studyId;
  //   const api = `${environment.serverUrl}/api/${this.controllerName}/update`;
  //   const body = JSON.stringify(studyAssumptionsDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  addOrUpdate(crmStudyResource: any) {
    // const api = environment.serverUrl + '/api/TblStudyResources/add-or-update/';
    const api = `${environment.serverUrl}/api/${this.controllerName}/add-or-update/`;

    const body = JSON.stringify(crmStudyResource);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  // deleteRecord(recId: number) {
  //   const api = environment.serverUrl + '/api/TblStudyResources/delete/' + recId;
  //   return this.http.delete(api, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }
}
