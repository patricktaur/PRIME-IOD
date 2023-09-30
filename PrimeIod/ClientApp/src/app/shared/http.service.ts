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
export class HttpService {
  constructor(private http: HttpClient) {}

  getRecord(id: number, controllerName: string, actionName: string = 'records') {
    const api = environment.serverUrl + `/api/${controllerName}/${actionName}/${id}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
