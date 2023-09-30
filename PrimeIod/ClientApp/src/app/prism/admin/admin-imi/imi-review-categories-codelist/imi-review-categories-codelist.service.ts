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
export class ImiReviewCategoriesCodelistService {
  constructor(private http: HttpClient) {}

  codeListParIdNames() {
    let api = `${environment.serverUrl}/api/tblIMIStudyReviewCategoriesFields/parents/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getdataforParid(parId: number) {
    let api = `${environment.serverUrl}/api/tblIMIStudyReviewCategoriesFields/records/${parId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  RecordForEdit(recId: number) {
    const api = environment.serverUrl + `/api/tblIMIStudyReviewCategoriesFields/getRecordByRecId/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addorUpdate(record: any) {
    const api = environment.serverUrl + `/api/tblIMIStudyReviewCategoriesFields/edit/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRec(recId: number) {
    const api = environment.serverUrl + `/api/tblIMIStudyReviewCategoriesFields/delete/${recId}`;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  NewRecord(parId: number) {
    const api = environment.serverUrl + `/api/tblIMIStudyReviewCategoriesFields/new/${parId}`;
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