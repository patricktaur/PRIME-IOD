import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
export class CDSValidationService {
  constructor(private http: HttpClient) {}

  getCdsValidationTaskList(filters: any) {
    const body = JSON.stringify(filters);
    // let api = `${environment.serverUrl}/api/TblDevelopmentTaskRequests/list-s`;
    let api = `${environment.serverUrl}/api/vwCDSValidationTaskV2/report-list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
