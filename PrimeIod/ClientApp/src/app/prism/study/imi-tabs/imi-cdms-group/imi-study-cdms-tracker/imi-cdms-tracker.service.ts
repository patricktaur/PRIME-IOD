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
export class ImiCdmsTrackerService {
  constructor(private http: HttpClient) {}

  getTaskGroups(studyId: number) {
    const api =
      environment.serverUrl + '/api/TblImicdmsTasksTimelinesTrackerMainRecords/cdms-tracker-task-groups-x/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
  getNew(studyId: number, groupId: number) {
    // const api = environment.serverUrl + '/api/TblImicdmsTasksTimelinesTrackerMainRecords/cdms-tracker-task-groups/' + studyId;
    const api = `${environment.serverUrl}/api/TblImicdmsTasksTimelinesTrackerMainRecords/new-abc/${studyId}/${groupId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordToView(recId: number) {
    const api = environment.serverUrl + '/api/TblImicdmsTasksTimelinesTrackerMainRecords/record-for-view/' + recId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRecord(recId: number) {
    const api = environment.serverUrl + '/api/TblImicdmsTasksTimelinesTrackerMainRecords/delete/' + recId;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
  cppcNumberExists(studyId: number, cppcNumber: number, currentRecId: number): any {
    const api = `${environment.serverUrl}/api/TblImicdmsTasksTimelinesTrackerMainRecords/cppc-number-exists/${studyId}/${cppcNumber}/${currentRecId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
