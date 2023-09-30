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
export class UserReportService {
  constructor(private http: HttpClient) {}

  getUserReport() {
    // let api = `${environment.serverUrl}/api/studyreports/project-review-compliance-report`;
    let api = `${environment.serverUrl}/api/TblUser/report-list`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}