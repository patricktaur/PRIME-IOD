import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CdsArchivedDataService {
  constructor(private http: HttpClient) {}

  getOutputRequestArchivedData() {
    let api = `${environment.serverUrl}/api/CdsArchivedData/output-request/files`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // download-output-request-file
  downloadOutputReqFile(cdsArchivedData: any) {
    let api = `${environment.serverUrl}/api/CdsArchivedData/download-output-request-file?fileName=${cdsArchivedData.link}`;

    return this.http.get(api, {responseType: 'blob'})
    .pipe(map(response => {
      return response;
    }))
    // let options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   }),

    //   responseType: 'blob' as 'blob'
    // }

    // let body = JSON.stringify(cdsArchivedData);
    // return this.http.post(api, body, options).pipe(
    //   map(response => {
    //     return response;
    //   })
    // );

    // const httpOptions: Object = {
    //   responseType: 'blob'
    // };
    // return this.http.post<HttpResponse<Blob>>(api, cdsArchivedData, httpOptions);
  }

  getDeliveryRequestArchivedData() {
    let api = `${environment.serverUrl}/api/CdsArchivedData/delivery-request/files`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  downloadDeliveryReqFile(cdsArchivedData: any) {
    const api = `${environment.serverUrl}/api/CdsArchivedData/download-delivery-request-file?fileName=${cdsArchivedData.link}`;

    return this.http.get(api, { responseType: 'blob' }).pipe(
      map(response => {
        return response;
      })
    );
  }
}