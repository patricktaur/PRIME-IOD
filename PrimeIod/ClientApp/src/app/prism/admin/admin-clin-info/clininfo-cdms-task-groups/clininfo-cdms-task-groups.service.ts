import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class clininfocdmstaskgroupsservice {
  constructor(private http: HttpClient) {}

  GetList() {
    let api = `${environment.serverUrl}/api/TblThirdPartyCdmsTaskGroupCodelist/all/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  GetById(recId: number) {
    const api = environment.serverUrl + `/api/TblThirdPartyCdmsTaskGroupCodelist/getbyid/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  GetTaskByGroupId(recId: number) {
    const api = environment.serverUrl + `/api/TblThirdPartyCdmsTaskGroup/getbygroupid/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  NewCDMSTasksRequest() {
    const api = environment.serverUrl + `/api/TblThirdPartyCdmsTaskGroup/getbyid/New`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  AddorUpdate(record: any) {
    const api = environment.serverUrl + `/api/TblThirdPartyCdmsTaskGroupCodelist/update/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  AddorUpdateCDMSTaskGroup(record: any) {
    const api = environment.serverUrl + `/api/TblThirdPartyCdmsTaskGroup/updateTask/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRec(recId: number) {
    const api = environment.serverUrl + `/api/TblThirdPartyCdmsTaskGroup/delete/${recId}`;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
