import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
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
export class CdmsCppcService {
  constructor(private http: HttpClient) {}

  existingNumbers = [123, 234, 456];

  cppcNumberExists(studyId: number, cppcNumber: number, currentRecId: number): any {
    const api = `${environment.serverUrl}/api/TblStudyCdmsChildRecords/cppc-number-exists/${studyId}/${cppcNumber}/${currentRecId}`;

    // const api = environment.serverUrl + '/api/TblStudyCdmsChildRecords/cppc-number-exists/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );

    // return of(this.existingNumbers.indexOf(cppcNumber) === -1);
  }

  // getRaveUrls(): any {
  //   const api = environment.serverUrl + '/api/TblRaveURLVersion/study-cdms-urls/';
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getVeevaVaultRaveUrls(): any {
  //   const api = environment.serverUrl + '/api/TblVeevaVaultVersion/study-cdms-urls/';
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }
}
