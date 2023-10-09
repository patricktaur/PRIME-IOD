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
export class TblParamService {
  constructor(private http: HttpClient) {}

  getParamParents() {
    let api = `${environment.serverUrl}/api/tblParam/param-parents/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getParId(childItemId: number) {
    let api = `${environment.serverUrl}/api/tblParam/get-parid/${childItemId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getParamList() {
    let api = `${environment.serverUrl}/api/tblParam/all`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getParams(parId: number): Observable<any> {
    let api = `${environment.serverUrl}/api/tblParam/params/${parId}`;
    return this.http.get(api).pipe(
      map(response => {
        // console.log(`response = ${JSON.stringify(response, null, 2)}`);
        return response;
      })
    );
  }

  getRoles(): any {
    //Roles are spread over 200 and 1800 parId
    let api = `${environment.serverUrl}/api/tblParam/roles/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordsBasedOnSearch(searchText: string, pageNo: any, pageSize: any) {
    const api =
      environment.serverUrl +
      '/api/tblParam/search?SearchFor=' +
      searchText +
      '&pageNo=' +
      pageNo +
      '&pageSize=' +
      pageSize;
    return this.http.get(api).pipe(
      map(response => {
        // console.log('in service :' + JSON.stringify(response));
        return response;
      })
    );
  }

  getTblParam(id: string | number) {
    const api = environment.serverUrl + '/api/tblParam/' + id;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getFieldValue(id: number) {
    const api = environment.serverUrl + '/api/tblParam/field-details/' + id;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addTblParam(tblParam: any) {
    const api = environment.serverUrl + '/api/tblParam/add';
    const body = JSON.stringify(tblParam);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateTblParam(tblParam: any) {
    const api = environment.serverUrl + '/api/tblParam/edit';
    const body = JSON.stringify(tblParam);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteTblParam(tblParam: any) {
    const api = environment.serverUrl + '/api/tblParam/delete?tblParamId=' + tblParam.recId;
    return this.http.delete(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
