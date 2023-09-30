import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
// import { templateJitUrl } from '@angular/compiler';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequestsCodeListService {
  constructor(private http: HttpClient) {}

  // Codelist Request API

  CreateRequestCodelistList() {
    let api = `${environment.serverUrl}/api/TblRequestcodelist/create-request-codelist-list/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  delete(recId: number) {
    const api = environment.serverUrl + `/api/TblRequestcodelist/create-request-codelist-delete/${recId}`;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  // CreateRequestCodelistNames(): any {
  //   let api = `${environment.serverUrl}/api/TblParam/codelist-names/`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       console.log(response);
  //       return response;
  //     })
  //   );
  // }

  CreateRequestCodelistNew() {
    const api = environment.serverUrl + `/api/TblRequestcodelist/create-request-codelist-new/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addorUpdate(record: any) {
    const api = environment.serverUrl + `/api/TblRequestcodelist/add-or-update/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  submitForApproval(record: any) {
    const api = environment.serverUrl + `/api/TblRequestcodelist/submit-for-approval/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  // CreateRequestCodelistAddorUpdateandSend(record: any) {
  //   const api = environment.serverUrl + `/api/TblRequestcodelist/create-request-codelist-add-or-update-and-send/`;
  //   const body = JSON.stringify(record);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // CreateRequestCodelistWidthdraw(record: any) {
  //   const api = environment.serverUrl + `/api/TblRequestcodelist/create-request-codelist-withdraw/`;
  //   const body = JSON.stringify(record);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  widthdraw(record: any) {
    const api = environment.serverUrl + `/api/TblRequestcodelist/withdraw/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  RecordForEdit(recId: number) {
    const api = environment.serverUrl + `/api/TblRequestcodelist/record-for-edit/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  //-------------------------- codelist update api
  UpdateRequestCodelistList() {
    let api = `${environment.serverUrl}/api/TblRequestcodelist/update-request-codelist-list/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // UpdateRequestCodelistDelete(recId: number) {
  //   const api = environment.serverUrl + `/api/TblRequestcodelist/update-request-codelist-delete/${recId}`;
  //   return this.http.delete(api, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // UpdateRequestCodelistNames(): any {
  //   let api = `${environment.serverUrl}/api/TblParam/codelist-names/`;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       console.log(response);
  //       return response;
  //     })
  //   );
  // }

  // UpdateRequestCodelistTask(recId: number): any {
  //   if (recId != undefined) {
  //     let api = `${environment.serverUrl}/api/TblParam/${recId}`;
  //     return this.http.get(api).pipe(
  //       map(response => {
  //         console.log(response);
  //         return response;
  //       })
  //     );
  //   }
  // }

  UpdateRequestCodelistNew() {
    const api = environment.serverUrl + `/api/TblRequestcodelist/update-request-codelist-new/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // UpdateRequestCodelistAddorUpdate(record: any) {
  //   const api = environment.serverUrl + `/api/TblRequestcodelist/update-request-codelist-add-or-update/`;
  //   const body = JSON.stringify(record);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // UpdateRequestCodelistAddorUpdateandSend(record: any) {
  //   const api = environment.serverUrl + `/api/TblRequestcodelist/update-request-codelist-add-or-update-and-send/`;
  //   const body = JSON.stringify(record);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  UpdateRequestCodelistEdit(recId: number) {
    const api = environment.serverUrl + `/api/TblRequestcodelist/update-request-codelist-edit/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // UpdateRequestCodelistWidthdraw(record: any) {
  //   const api = environment.serverUrl + `/api/TblRequestcodelist/update-request-codelist-withdraw/`;
  //   const body = JSON.stringify(record);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  //-------------------------- Codelist Deactivate api

  DeactivateRequestCodelistList() {
    let api = `${environment.serverUrl}/api/TblRequestcodelist/deactivate-request-codelist-list/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // // DeactivateRequestCodelistDelete(recId: number) {
  // //   const api = environment.serverUrl + `/api/TblRequestcodelist/deactivate-request-codelist-delete/${recId}`;
  // //   return this.http.delete(api, httpOptions).pipe(
  // //     map(response => {
  // //       return response;
  // //     })
  // //   );
  // // }

  DeactivateRequestCodelistNew() {
    const api = environment.serverUrl + `/api/TblRequestcodelist/deactivate-request-codelist-new/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // DeactivateRequestCodelistTask(recId: number): any {
  //   if (recId != undefined) {
  //     let api = `${environment.serverUrl}/api/TblParam/${recId}`;
  //     return this.http.get(api).pipe(
  //       map(response => {
  //         console.log(response);
  //         return response;
  //       })
  //     );
  //   }
  // }

  DeactivateRequestCodelistEdit(recId: number) {
    const api = environment.serverUrl + `/api/TblRequestcodelist/deactivate-request-codelist-edit/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // DeactivateRequestCodelistAddorUpdate(record: any) {
  //   const api = environment.serverUrl + `/api/TblRequestcodelist/deactivate-request-codelist-add-or-update/`;
  //   const body = JSON.stringify(record);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // DeactivateRequestCodelistAddorUpdateandSend(record: any) {
  //   const api = environment.serverUrl + `/api/TblRequestcodelist/deactivate-request-codelist-add-or-update-and-send/`;
  //   const body = JSON.stringify(record);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // DeactivateRequestCodelistWidthdraw(record: any) {
  //   const api = environment.serverUrl + `/api/TblRequestcodelist/deactivate-request-codelist-withdraw/`;
  //   const body = JSON.stringify(record);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  //codelist Approval Request API

  ApprovalRequestCodelistList() {
    let api = `${environment.serverUrl}/api/TblRequestcodelist/approval-request-codelist-list/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  ApprovalRequestCodelistEdit(recId: number) {
    const api = environment.serverUrl + `/api/TblRequestcodelist/approval-request-codelist-edit/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  approve(record: any) {
    const api = environment.serverUrl + `/api/TblRequestcodelist/approve/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  reject(record: any) {
    const api = environment.serverUrl + `/api/TblRequestcodelist/reject/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  undoReject(record: any) {
    const api = environment.serverUrl + `/api/TblRequestcodelist/undo-reject/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
