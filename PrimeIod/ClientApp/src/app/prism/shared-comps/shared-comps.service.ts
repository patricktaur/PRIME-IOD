import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SharedCompsService {
  constructor(private http: HttpClient) {}

  getDMFilters() {
    const api = `${environment.serverUrl}/api/common/dm-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getDMStudyIconNumbers() {
    const api = `${environment.serverUrl}/api/common/dm-study-icon-numbers`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getDMStudyIconAndSponsorFilters() {
    const api = `${environment.serverUrl}/api/common/dm-icon-number-sponsor-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUserStudyResources(userId : number) {
    const api = `${environment.serverUrl}/api/common/user-study-resources/${userId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUserRoles(userId : number) {
    const api = `${environment.serverUrl}/api/common/user-roles/${userId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }


  getExternalDataReportFilters() {
    const api = `${environment.serverUrl}/api/vwExternalDataReportV2/external-data-report-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCelgeneDeliverablesReportFilters() {
    const api = `${environment.serverUrl}/api/vwCelgenceDeliverablesV2/report-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCdmsTasksFilters() {
    const api = `${environment.serverUrl}/api/vwReportCDMSTaskListV2/report-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getThirdPartyCdmsTaskListFilters() {
    const api = `${environment.serverUrl}/api/vwReportThirdPartyCDMSTaskListV2/report-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getThirdPartyCdmsTaskGroupFilters() {
    const api = `${environment.serverUrl}/api/vwReportThirdPartyCDMSTaskGroupV2/report-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getImiCdmsFilters() {
    const api = `${environment.serverUrl}/api/vwIMICDMSReportV2/imi-cdms-report-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getImiCdmsTaskListFilters() {
    const api = `${environment.serverUrl}/api/vwReportIMICDMSTasksListV2/report-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getDmImiCdmsFilters() {
    const api = `${environment.serverUrl}/api/vwReportDmImiCDMSV2/dm-imi-cdms-report-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getImiReviewPerFilters() {
    const api = `${environment.serverUrl}/api/vwIMIStudyReviewReaderPerformanceV2/report-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getImiReviewIssueTrackerFilters() {
    const api = `${environment.serverUrl}/api/vwIMIStudyIssueTrackerV2/report-filters`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getLoginDetails(searchFor: any, pageNumber: number, pageSize: number) {
    const api = `${environment.serverUrl}/api/tblLoginDetailsV2/report-list-s?searchFor=${searchFor}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    console.log(`api = ${api}`);
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
