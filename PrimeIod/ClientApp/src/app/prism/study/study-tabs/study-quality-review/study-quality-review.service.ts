import { Injectable } from '@angular/core';
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
export class StudyQualityReviewService {
  constructor(private http: HttpClient) {}

  //getList:
  //List component's service is used for getList.

  // getNew(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblExternalData/new/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getRecordToEdit(recId: number) {
  //   const api = environment.serverUrl + '/api/tblExternalData/edit/' + recId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // addOrUpdate(IssueTrackerRecord: any) {
  //   const api = environment.serverUrl + '/api/tblExternalData/add-or-update';
  //   const body = JSON.stringify(IssueTrackerRecord);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // deleteRecord(recId: number) {
  //   const api = environment.serverUrl + '/api/tblExternalData/delete/' + recId;
  //   return this.http.delete(api, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getDTSStatus() {
  //   const api = environment.serverUrl + '/api/tblExternalData/dts-status';
  //   return this.http.ge(api, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  GetTblStudyQrMaster(studyId: number): any {
    const api = environment.serverUrl + '/api/TblStudyQr/qr-master-edit-newx/' + studyId;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addOrUpdateQrMaster(record: any) {
    const api = environment.serverUrl + '/api/TblStudyQr/add-or-update-qr-master';
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  TimeStampValues(): any {
    return [
      { id: 10, value: '10%' },
      { id: 20, value: '20%' },
      { id: 30, value: '30%' },
      { id: 40, value: '40%' },
      { id: 50, value: '50%' },
      { id: 60, value: '60%' },
      { id: 70, value: '70%' },
      { id: 80, value: '80%' },
      { id: 90, value: '90%' },
      { id: 100, value: '100%' }
    ];
  }
}
