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
export class CDSInstructionService {
  constructor(private http: HttpClient) {}

  getCdsInstructionTaskList(filters: any) {
    const body = JSON.stringify(filters);
    let api = `${environment.serverUrl}/api/vwCDSInstructionTaskV2/report-list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCdsInstructionTrackerFilters() {
    const api = `${environment.serverUrl}/api/vwCDSInstructionTaskV2/cds-task-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
