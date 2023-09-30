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
export class StudyTabsService {
  constructor(private http: HttpClient) {}

  getStudyLocalLabDTO(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudy/study-local-lab/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyLocalLabViewDTO(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudy/study-local-lab-view/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStudyLocalLab(studyId: number, studyAssumptionsDTO: any) {
    const api = environment.serverUrl + '/api/tblStudy/save-study-local-lab/' + studyId;
    const body = JSON.stringify(studyAssumptionsDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getPaperDashboardDTO(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudy/study-paper-dashboard/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  savePaperDashboard(studyId: number, paperDashboardDTO: any) {
    const api = environment.serverUrl + '/api/tblStudy/save-study-paper-dashboard/' + studyId;
    const body = JSON.stringify(paperDashboardDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getOffLineIgnoreItems(studyId: number) {
    const api = environment.serverUrl + '/api/TblOfflineIgnore/recordsx/' + studyId;
    //TblStudyOfflineIgnore
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveOfflineIgnoreItems(studyId: number, offlineIgnoreItems: any) {
    const api = environment.serverUrl + '/api/TblOfflineIgnore/add-or-update/' + studyId;
    const body = JSON.stringify(offlineIgnoreItems);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyCdsDTO(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudy/study-cds/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyCdsViewDTO(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudy/study-cds-view/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStudyCds(studyId: number, studyCdsDto: any) {
    const api = environment.serverUrl + '/api/tblStudy/save-study-cds/' + studyId;
    const body = JSON.stringify(studyCdsDto);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyCdmsDTO(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudy/study-cdms-x/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyCdmsExtractSpecificationDTO(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudy/cdms-extact-specification/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyCdmsViewDTO(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudy/study-cdms-x-view/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStudyCdms(studyId: number, studyCdmsDto: any) {
    const api = environment.serverUrl + '/api/tblStudy/save-study-cdms/' + studyId;
    const body = JSON.stringify(studyCdmsDto);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStudyCdmsExtractSpecification(studyId: number, cdmsExtractSpecificationDto: any) {
    const api = environment.serverUrl + '/api/tblStudy/save-cdms-extract-specification/' + studyId;
    const body = JSON.stringify(cdmsExtractSpecificationDto);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyKpiDTO(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudy/study-kpi/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStudyKpi(studyId: number, studyKpi: any) {
    const api = environment.serverUrl + '/api/tblStudy/save-study-kpi/' + studyId;
    const body = JSON.stringify(studyKpi);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyKpiDashboard(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudy/study-kpi-dashboard/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStudyKpiDashboard(studyId: number, studyKpi: any) {
    const api = environment.serverUrl + '/api/tblStudy/save-study-kpi-dashboard/' + studyId;
    const body = JSON.stringify(studyKpi);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
