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
export class AppAccessService {
  constructor(private http: HttpClient) {}

  getAppComponentPermissions(userId : number) {
    let api = `${environment.serverUrl}/api/AppComponent/app-component-permissions/${userId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
  
}
