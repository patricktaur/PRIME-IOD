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
export class PrismHomeService {
  constructor(private http: HttpClient) {}

  getStudyList(filters: any) {
    const body = JSON.stringify(filters);
    let api = `${environment.serverUrl}/api/vwStudyListV2/study-list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getImiStudyList(filters: any) {
    const body = JSON.stringify(filters);
    let api = `${environment.serverUrl}/api/VwIMIStudyListV2/study-list-s`;
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
