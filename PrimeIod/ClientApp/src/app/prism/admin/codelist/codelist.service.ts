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
export class CodelistService {
  constructor(private http: HttpClient) {}

  codeListParIdNames() {
    let api = `${environment.serverUrl}/api/TblParam/param-parents/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
  getdataforParid(parId: number) {
    let api = `${environment.serverUrl}/api/TblParam/params/${parId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  RecordForEdit(recId: number) {
    const api = environment.serverUrl + `/api/TblParam/getRecordByRecId/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addorUpdate(record: any) {
    const api = environment.serverUrl + `/api/TblParam/edit/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRec(recId: number) {
    const api = environment.serverUrl + `/api/TblParam/paramdelete/${recId}`;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  NewRecord(parId: number) {
    const api = environment.serverUrl + `/api/TblParam/param-new/${parId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  //   GetUser(recId: number) {
  //     const api = environment.serverUrl + `/api/TblUser/${recId}`;
  //     return this.http.get(api).pipe(
  //       map(response => {
  //         return response;
  //       })
  //     );
  //   }

  //   CreateRequestUserAddorUpdate(record: any) {
  //     const api = environment.serverUrl + `/api/TblUser/update/`;
  //     const body = JSON.stringify(record);
  //     return this.http.put(api, body, httpOptions).pipe(
  //       map(response => {
  //         return response;
  //       })
  //     );
  //   }
}
