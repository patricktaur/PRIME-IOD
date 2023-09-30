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
export class AppAdminService {
  constructor(private http: HttpClient) {}

  // getUsers() {
  //   const api = environment.serverUrl + '/api/Account/users';
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getUsersByFilter(pageNo: any, pageSize: any) {
    const api = `${environment.serverUrl}/api/Account/users/${pageNo}/${pageSize}`;

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUser(id: string) {
    const api = environment.serverUrl + '/api/Account/usersx/' + id;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUsersByRole(role: string) {
    const api = environment.serverUrl + '/api/Account/users/byrole?rolename=' + role;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUsersBasedOnSearch(searchText: string, pageNo: any, pageSize: any) {
    const api =
      environment.serverUrl +
      '/api/Account/users/search?SearchFor=' +
      searchText +
      '&pageNo=' +
      pageNo +
      '&pageSize=' +
      pageSize;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addUser(user: any) {
    console.log(`user = ${JSON.stringify(user, null, 2)}`);
    const api = environment.serverUrl + '/api/Account/users/add';
    const body = JSON.stringify(user);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateUser(user: any) {
    console.log(`user update = ${JSON.stringify(user, null, 4)}`);
    // const api = environment.serverUrl + '/api/Account/users/' + user.id;
    const api = environment.serverUrl + '/api/tbluser/update/';

    console.log(`user = ${JSON.stringify(user, null, 2)}`);
    const body = JSON.stringify(user);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteUser(user: any) {
    const api = environment.serverUrl + '/api/Account/users/' + user.id;
    return this.http.delete(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  createUser(user: any) {
    const api = environment.serverUrl + '/api/users';
    const body = JSON.stringify(user);
    return this.http.post(api, body).pipe(
      map(response => {
        return response;
      })
    );
  }

  createRole(role: any) {
    const api = environment.serverUrl + '/roles';
    const body = JSON.stringify(role);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllRoles() {
    //alert("getAllRoles");
    const api = environment.serverUrl + '/api/Account/rolesx/';
    // const api = environment.serverUrl + '/api/Account/roles/'+ pageNumber + '/' + pageSize;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRoles(pageNumber: any, pageSize: any) {
    // const api = environment.serverUrl + '/api/Account/roles';
    const api = environment.serverUrl + '/api/Account/roles/' + pageNumber + '/' + pageSize;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllRoleNames() {
    // const api = environment.serverUrl + '/api/Account/role-names/' ;
    const api = environment.serverUrl + '/api/roles/';

    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRoleNames(pageNumber: any, pageSize: any) {
    const api = environment.serverUrl + '/api/Account/role-names/' + pageNumber + '/' + pageSize;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRole(roleId: number) {
    // const api = environment.serverUrl + '/api/Account/roles';
    const api = `${environment.serverUrl}/api/Account/roles/${roleId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addRole(role: any) {
    const api = environment.serverUrl + '/api/Account/roles';
    const body = JSON.stringify(role);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  editRole(role: any) {
    const api = environment.serverUrl + '/api/Account/roles/' + role.id;

    // const api = environment.serverUrl + '/api/roles/' + role.id;
    const body = JSON.stringify(role);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRole(role: any) {
    console.log('Delete:' + JSON.stringify(role));
    const api = environment.serverUrl + '/api/Account/roles/' + role.id;
    return this.http.delete(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getPermissions() {
    const api = environment.serverUrl + '/api/Account/permissions/';
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  //----
  //Prism Roles:
  // getPrismRoles(pageNumber: any, pageSize: any) {
  //   // const api = environment.serverUrl + '/api/Account/roles';
  //   const api = environment.serverUrl + '/api/roles/search/' + pageNumber + '/' + pageSize;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getPrismRoles(searchText: string, pageNo: any, pageSize: any) {
    const api =
      environment.serverUrl +
      '/api/roles/search?SearchFor=' +
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
}
