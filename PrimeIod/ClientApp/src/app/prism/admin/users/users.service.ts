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
export class UsersService {
  constructor(private http: HttpClient) {}

  UserList() {
    let api = `${environment.serverUrl}/api/TblUser/all/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  GetUser(recId: number) {
    const api = environment.serverUrl + `/api/TblUser/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  CreateRequestUserAddorUpdate(record: any) {
    const api = environment.serverUrl + `/api/TblUser/update/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
