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
export class StudyCdmsService {
  constructor(private http: HttpClient) {}

  getCdmsUrls(studyId: number): any {
    const api = environment.serverUrl + '/api/TblStudy/study-cdms-urls/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRaveUrls(): any {
    const api = environment.serverUrl + '/api/TblRaveURLVersion/study-cdms-urls';

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRaveIconOwned(cdmsUrl: string): any {
    // const api = environment.serverUrl + '/api/TblRaveURLVersion/icon-owned/';
    const api = `${environment.serverUrl}/api/TblRaveURLVersion/icon-owned/${cdmsUrl}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getVeevaVaultUrls(): any {
    const api = environment.serverUrl + '/api/TblVeevaVaultVersion/study-cdms-urls';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getVeevaVaultIconOwned(cdmsUrl: string): any {
    // const api = environment.serverUrl + '/api/TblVeevaVaultVersion/study-cdms-urls/';
    const api = `${environment.serverUrl}/api/TblVeevaVaultVersion/icon-owned/${cdmsUrl}`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  cdmsTimelineValidate(studyId: number, splitGoLive: boolean): any {
    // const api = environment.serverUrl + '/api/TblStudy/cdms-timeline-validate/';
    const api = `${environment.serverUrl}/api/TblStudy/cdms-timeline-validate/${studyId}/${splitGoLive}`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
