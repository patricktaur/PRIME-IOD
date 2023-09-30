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
export class CrmAnalysisPlanningEditService {
  controllerName = 'tblCrmStudyAnalysisPlanning';
  controllerName1 = 'TblCrmStudyAnalysisPlanningFlow';
  constructor(private http: HttpClient) {}

  // const api = `${environment.serverUrl}/api/account/users/${pageNo}/${pageSize}`;
  getall(selectedFilters:any) {
   // alert(selectedFilters.year);
    // const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/allrecords`;
    // let body = JSON.stringify({
    //  selectedFilters
    // });
    let body=selectedFilters;
    return this.http.post(api,body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );

  }

  getRecordForEdit(studyId: number) {
    // const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/records/${studyId}/`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAnaysisTableRecords(studyId: number, analysisPlanningId: number, firstAnalysisDate: any, finalAnalysisDate: any) {
    // const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;

    const api = `${environment.serverUrl}/api/${this.controllerName}/table-records`;

    let body = JSON.stringify({
      studyId: studyId,
      firstAnalysisDate: firstAnalysisDate,
      finalAnalysisDate: finalAnalysisDate,
      analysisPlanningId: analysisPlanningId
    });

    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateFlowRecords(analysisPlanningFlowRecs: any) {
    const api = `${environment.serverUrl}/api/${this.controllerName}/save-flow-records`;
    const body = JSON.stringify(analysisPlanningFlowRecs);

    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordForEditFlow(TaskId: number) {
    // const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName1}/records/${TaskId}/`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  update(studyId: number, studyAssumptionsDTO: any) {
    // const api = environment.serverUrl + '/api/tblStudy/save-study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName}/update`;
    const body = JSON.stringify(studyAssumptionsDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateFlow(studyId: number, TempDTO: any) {
    // const api = environment.serverUrl + '/api/tblStudy/save-study-local-lab/' + studyId;
    const api = `${environment.serverUrl}/api/${this.controllerName1}/save-pageflow/${studyId}`;
    const body = JSON.stringify(TempDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
