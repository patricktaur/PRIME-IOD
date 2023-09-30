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
export class UserLoginDetailsService {
  constructor(private http: HttpClient) {}
  
  getLoginDetails(userId: any, filterObj: any) {
    const api = `${environment.serverUrl}/api/tblLoginDetailsV2/user-report-list-s?userId=${userId}`;
    // console.log(`api = ${api}`);
    let body = JSON.stringify(filterObj);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
