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
export class FTEListService {
  controllerName = 'TblStudyFtes';
  constructor(private http: HttpClient) {}

  getSampleTemplate() {
    const api = `${environment.serverUrl}/api/${this.controllerName}/template`;

    return this.http.get(api, { responseType: 'blob' }).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUploadHistory() {
    // const api = environment.serverUrl + `/api/${controllerName}/${actionName}/${studyId}`;
    const api = `${environment.serverUrl}/api/${this.controllerName}/upload-history`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  uploadFile(file : File) {
    const api = `${environment.serverUrl}/api/${this.controllerName}/upload`;

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(api, formData).pipe(
      map(response => {
        return response;
      })
    );
  }

  getNew() {
    // const api = environment.serverUrl + '/api/TblStudyResources/new/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/new/`;
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

  deleteRecord(recId: number) {
    // const api = environment.serverUrl + '/api/TblStudyResources/delete/' + recId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/delete/${recId}`;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
