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
export class cdmstaskgroupsService {
  constructor(private http: HttpClient) {}

  GetList() {
    let api = `${environment.serverUrl}/api/TblCdmsTaskGroupCodelist/all/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  GetById(recId: number) {
    const api = environment.serverUrl + `/api/TblCdmsTaskGroupCodelist/getbyid/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  GetTaskByGroupId(recId: number) {
    const api = environment.serverUrl + `/api/TblCdmsTaskGroup/getbygroupid/${recId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  NewCDMSTasksRequest() {
    const api = environment.serverUrl + `/api/TblCdmsTaskGroupCodelist/getbyid/New`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  AddorUpdate(record: any) {
    const api = environment.serverUrl + `/api/TblCdmsTaskGroupCodelist/update/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  AddorUpdateCDMSTaskGroup(record: any) {
    const api = environment.serverUrl + `/api/TblCdmsTaskGroup/updateTask/`;
    const body = JSON.stringify(record);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRec(recId: number) {
    const api = environment.serverUrl + `/api/TblCdmsTaskGroupCodelist/delete/${recId}`;
    return this.http.delete(api, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}