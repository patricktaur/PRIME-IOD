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
export class AppAccessGroupMembersService {
  controllerName = 'TblAppAccessGroupMembers';
  constructor(private http: HttpClient) {}

  getUsers() {
    const api = `${environment.serverUrl}/api/${this.controllerName}/users`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getGroupMembers(groupId: number) {
    const api = `${environment.serverUrl}/api/${this.controllerName}/get-group-members/${groupId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateGroupMembers(groupId: number, groupMembers: any) {
    const api = `${environment.serverUrl}/api/${this.controllerName}/update-group-members/${groupId}`;

    const body = JSON.stringify(groupMembers);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
