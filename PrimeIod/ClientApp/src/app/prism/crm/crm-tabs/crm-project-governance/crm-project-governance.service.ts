import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Router, ActivatedRoute } from '@angular/router';
let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class crmProjectGovernanceService {
  // controllerName = 'tblCrmProjectGovernanceData';
  controllerName = 'TblCrmProjectGovernanceReview';

  constructor(private http: HttpClient) {}

  // const api = `${environment.serverUrl}/api/account/users/${pageNo}/${pageSize}`;

  getCrmProjGovCurrentReview(studyId: number, groupId: number) {
    //alert("reached");
    let api = `${environment.serverUrl}/api/${this.controllerName}/proj-gov-current-review/${studyId}/${groupId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCrmProjGovCurrentReviewId(studyId: number, groupId: number) {
    //alert("reached");
    let api = `${environment.serverUrl}/api/${this.controllerName}/proj-gov-cur-rev-id/${studyId}/${groupId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }


  getCrmProjGovReview(reviewId: number) {
    //alert("reached");
    let api = `${environment.serverUrl}/api/${this.controllerName}/proj-gov-review/${reviewId}/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
  
  
  getCrmProjGovReviewList(studyId: number, groupId: number) {
    let api = `${environment.serverUrl}/api/${this.controllerName}/proj-gov-review-list/${studyId}/${groupId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
  
  getCrmProjectGovernanceSetupRecords(studyId: number) {
    //alert("reached");
    let api = `${environment.serverUrl}/api/${this.controllerName}/setUprecords/${studyId}/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCrmProjectGovernanceOngoingRecords(studyId: number) {
    //alert("reached");
    let api = `${environment.serverUrl}/api/${this.controllerName}/Ongoingrecords/${studyId}/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCrmProjectGovernanceAnalysisRecords(studyId: number) {
    //alert("reached");
    let api = `${environment.serverUrl}/api/${this.controllerName}/Analysisrecords/${studyId}/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCrmProjectGovernanceClosureRecords(studyId: number) {
    //alert("reached");
    let api = `${environment.serverUrl}/api/${this.controllerName}/Closurerecords/${studyId}/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveData(TempData: any) {
    //alert("reached");
    // const api = environment.serverUrl + '/api/tblStudy/save-study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/updateDB`;
    const body = JSON.stringify(TempData);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  markAsReviewed(review: any) {
    const api = `${environment.serverUrl}/api/${this.controllerName}/mark-as-reviewed/`;
    const body = JSON.stringify(review);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  //   getRecordForEdit(studyId:number,recId: number) {
  //     // const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;
  //     const api = `${environment.serverUrl}/api/${this.controllerName}/records/${studyId}/${recId}/`;

  //     return this.http.get(api).pipe(
  //       map(response => {
  //         return response;
  //       })
  //     );
  //   }

  //   getNewRecordModule(studyId:number) {
  //     // const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;
  //     const api = `${environment.serverUrl}/api/${this.controllerName}/newrecord/${studyId}/`;

  //     return this.http.get(api).pipe(
  //       map(response => {
  //         return response;
  //       })
  //     );
  //   }

  //   update(studyId: number, TempData: any) {
  //     // const api = environment.serverUrl + '/api/tblStudy/save-study-local-lab/' + studyId;
  //     const api = `${environment.serverUrl}/api/${this.controllerName}/update`;
  //     const body = JSON.stringify(TempData);
  //     return this.http.put(api, body, httpOptions).pipe(
  //       map(response => {
  //         return response;
  //       })
  //     );
  //   }

  //   deleteBudget(recId: number) {
  //     const api = environment.serverUrl + `/api/${this.controllerName}/delete/${recId}`;
  //     return this.http.delete(api, httpOptions).pipe(
  //       map(response => {
  //         return response;
  //       })
  //     );
  //   }
}
