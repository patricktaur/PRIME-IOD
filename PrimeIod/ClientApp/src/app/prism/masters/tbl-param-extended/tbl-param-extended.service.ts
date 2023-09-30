import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { JsonPipe } from '@angular/common';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TblParamExtendedExtendedService {
  constructor(private http: HttpClient) {}

  getParamParents() {
    let api = `${environment.serverUrl}/api/TblParamExtended/param-parents/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getParamList() {
    let api = `${environment.serverUrl}/api/TblParamExtended/all`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getParams(parId: number): any {
    let api = `${environment.serverUrl}/api/TblParamExtended/params/${parId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addTblParamExtended(TblParamExtended: any) {
    const api = environment.serverUrl + '/api/TblParamExtended/add';
    const body = JSON.stringify(TblParamExtended);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateTblParamExtended(TblParamExtended: any) {
    const api = environment.serverUrl + '/api/TblParamExtended/edit';
    const body = JSON.stringify(TblParamExtended);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteTblParamExtended(TblParamExtended: any) {
    const api = environment.serverUrl + '/api/TblParamExtended/delete?TblParamExtendedId=' + TblParamExtended.recId;
    return this.http.delete(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
