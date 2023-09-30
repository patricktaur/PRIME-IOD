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
export class StudyExternalDataListService {
  constructor(private http: HttpClient) {}

  //getList:
  //List component's service is used for getList.

  getNew(studyId: number) {
    const api = environment.serverUrl + '/api/tblExternalData/new/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordToEdit(recId: number) {
    const api = environment.serverUrl + '/api/tblExternalData/edit/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addOrUpdate(IssueTrackerRecord: any) {
    const api = environment.serverUrl + '/api/tblExternalData/add-or-update';
    const body = JSON.stringify(IssueTrackerRecord);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRecord(recId: number) {
    const api = environment.serverUrl + '/api/tblExternalData/delete/' + recId;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  // getDTSStatus() {
  //   const api = environment.serverUrl + '/api/tblExternalData/dts-status/';
  //   return this.http.ge(api, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  FrequencyOfTransfer(): any {
    const api = environment.serverUrl + '/api/tblExternalData/frequency-of-transfer';

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  DTSStatus(): any {
    const api = environment.serverUrl + '/api/tblExternalData/dts-status';

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  TestTransferStatus(): any {
    const api = environment.serverUrl + '/api/tblExternalData/test-transfer-status';

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  ReconciliationListingStatus(): any {
    const api = environment.serverUrl + '/api/tblExternalData/reconciliation-listing-status';

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  BindedTransferRequired(): any {
    const api = environment.serverUrl + '/api/tblExternalData/binded-transfer-required';

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  /*

        
        
        
  */
}
