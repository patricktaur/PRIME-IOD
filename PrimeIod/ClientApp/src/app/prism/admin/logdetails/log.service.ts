import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class LogService {
  constructor(private http: HttpClient) {}
  
  getLoginDetails(filterObj: any) {
    const api = `${environment.serverUrl}/api/tblLoginDetailsV2/report-list-s`;
    // console.log(`api = ${api}`);
    let body = JSON.stringify(filterObj);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getMailLogs(filterObj: any) {
    const api = `${environment.serverUrl}/api/tblMailLog/report-list-s`;
    // console.log(`api = ${api}`);
    let body = JSON.stringify(filterObj);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getErrorLogs() {
    const api = `${environment.serverUrl}/api/ErrorLogs/records`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getLogFile(fileName: any) {
    const api = `${environment.serverUrl}/api/ErrorLogs/file?name=${fileName}`;

    return this.http.get(api, { responseType: 'blob' }).pipe(
      map(response => {
        return response;
      })
    );
  }
}
