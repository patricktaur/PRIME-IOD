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
export class TblCrmParamService {
  constructor(private http: HttpClient) {}

  getParamParents() {
    let api = `${environment.serverUrl}/api/TblCrmParam/param-parents/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getParId(childItemId: number) {
    let api = `${environment.serverUrl}/api/TblCrmParam/get-parid/${childItemId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getParamList() {
    let api = `${environment.serverUrl}/api/TblCrmParam/all`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getParams(parId: number): any {
    let api = `${environment.serverUrl}/api/TblCrmParam/params/${parId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRoles(): any {
    //Roles are spread over 200 and 1800 parId
    let api = `${environment.serverUrl}/api/TblCrmParam/roles/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordsBasedOnSearch(searchText: string, pageNo: any, pageSize: any) {
    const api =
      environment.serverUrl +
      '/api/TblCrmParam/search?SearchFor=' +
      searchText +
      '&pageNo=' +
      pageNo +
      '&pageSize=' +
      pageSize;
    return this.http.get(api).pipe(
      map(response => {
        console.log('in service :' + JSON.stringify(response));
        return response;
      })
    );
  }

  getTblParam(id: string | number) {
    const api = environment.serverUrl + '/api/TblCrmParam/' + id;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getFieldValue(id: number) {
    const api = environment.serverUrl + '/api/TblCrmParam/field-details/' + id;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addTblParam(tblParam: any) {
    const api = environment.serverUrl + '/api/TblCrmParam/add';
    const body = JSON.stringify(tblParam);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateTblParam(tblParam: any) {
    const api = environment.serverUrl + '/api/TblCrmParam/edit';
    const body = JSON.stringify(tblParam);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteTblParam(tblParam: any) {
    const api = environment.serverUrl + '/api/TblCrmParam/delete?id=' + tblParam.recId;
    return this.http.delete(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
