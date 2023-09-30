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
export class TblTaskCategoryService {
  constructor(private http: HttpClient) {}

  getTblTaskCategoryList() {
    let api = `${environment.serverUrl}/api/tblTaskCategory`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordsBasedOnSearch(searchText: string, pageNo: any, pageSize: any) {
    const api =
      environment.serverUrl +
      '/api/tblTaskCategory/search?SearchFor=' +
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

  getTblTaskCategory(id: string) {
    const api = environment.serverUrl + '/api/tblTaskCategory/' + id;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addTblTaskCategory(tblTaskCategory: any) {
    const api = environment.serverUrl + '/api/tblTaskCategory/add';
    const body = JSON.stringify(tblTaskCategory);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateTblTaskCategory(tblTaskCategory: any) {
    const api = environment.serverUrl + '/api/tblTaskCategory/edit';
    const body = JSON.stringify(tblTaskCategory);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteTblTaskCategory(tblTaskCategory: any) {
    const api = environment.serverUrl + '/api/tblTaskCategory/delete?tblTaskCategoryId=' + tblTaskCategory.recId;
    return this.http.delete(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
