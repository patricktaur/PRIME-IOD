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
export class CrmListService {
  controllerName = 'vwCrmStudyListV2';
  constructor(private http: HttpClient) {}

  getStudyList() {
    let api = `${environment.serverUrl}/api/${this.controllerName}/report-list`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyListwithFilter(filters: any) {
    const body = JSON.stringify(filters);
    let api = `${environment.serverUrl}/api/${this.controllerName}/study-list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecord(studyId: number) {
    let api = `${environment.serverUrl}/api/${this.controllerName}/record/${studyId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCrmListFilters() {
    const api = `${environment.serverUrl}/api/${this.controllerName}/crm-list-filters/`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
