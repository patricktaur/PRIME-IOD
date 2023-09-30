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
export class TblUserService {
  constructor(private http: HttpClient) {}

  getTblUserList() {
    let api = `${environment.serverUrl}/api/tblUser`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordsBasedOnSearch(searchText: string, pageNo: any, pageSize: any) {
    const api =
      environment.serverUrl +
      '/api/tblUser/search?SearchFor=' +
      searchText +
      '&pageNo=' +
      pageNo +
      '&pageSize=' +
      pageSize;
    return this.http.get(api).pipe(
      map(response => {
        console.log('in service :' + JSON.stringify(response));
        return response;
      })
    );
  }

  getTblUser(id: string) {
    const api = environment.serverUrl + '/api/tblUser/' + id;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // user-and-roles/{id}
  //not called anywhere.  can be deleted.
  getUserAndRoles(id: string) {
    const api = environment.serverUrl + '/api/tblUser/user-and-roles/' + id;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // user-view-dto/{id}

  getUserViewDto(id: number) {
    const api = environment.serverUrl + '/api/tblUser/user-view-dto/' + id;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addTblUser(tblUser: any) {
    const api = environment.serverUrl + '/api/tblUser/add';
    const body = JSON.stringify(tblUser);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateTblUser(tblUser: any) {
    const api = environment.serverUrl + '/api/tblUser/edit';
    const body = JSON.stringify(tblUser);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteTblUser(tblUser: any) {
    const api = environment.serverUrl + '/api/tblUser/delete?tblUserId=' + tblUser.recId;
    return this.http.delete(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUsers(): any {
    const api = environment.serverUrl + '/api/tblUser/users';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUserByrole(roleId: number): any {
    const api = environment.serverUrl + '/api/tblUser/user-by-role/' + roleId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getDmpmCdlUsers(): any {
    const api = environment.serverUrl + '/api/tblUser/dmpm-cdl-users';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getSdtmProgLeadUsers(): any {
    //
    const api = environment.serverUrl + '/api/tblUser/sdtm-programming-leads';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getClinicalProgLeadUsers(): any {
    //
    const api = environment.serverUrl + '/api/tblUser/clinical-programming-leads';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUsersWithRole_Cdpl_CdsManager_CdplSdtmProgrammer(): any {
    //
    const api = environment.serverUrl + '/api/tblUser/cdpl-cds-manager-cdpl-sdtm-programmer';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUsersWithRole_Cdpl_CdsProgrammer(): any {
    //
    const api = environment.serverUrl + '/api/tblUser/cdpl-cds-programmer';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUsersWithRole_CdsProgrammer(): any {
    //
    const api = environment.serverUrl + '/api/tblUser/cds-programmer/';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUsersWithRole_Imi_Cdpl(): any {
    //
    const api = environment.serverUrl + '/api/tblUser/imi-cdpl';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUsersForcdacm(): any {
    //
    const api = environment.serverUrl + '/api/tblUser/getusersForcdacm';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getusersforClinicalRiskMang(): any {
    //
    const api = environment.serverUrl + '/api/tblUser/getusersforClinicalRiskMang';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getusersforAnalyticsDevLead(): any {
    //
    const api = environment.serverUrl + '/api/tblUser/getusersforAnalyticsDevLead';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }


}
