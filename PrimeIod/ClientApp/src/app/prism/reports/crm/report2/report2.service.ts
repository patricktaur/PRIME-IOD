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
export class report2Service {
    controllerName = 'vwCrmReport2';
   // controllerName = 'tblCrmStudyAnalysisPlanning';
    
    constructor(private http: HttpClient) {}

    getall(selectedFilters:any) {
     // alert(selectedFilters.year);
    const api = `${environment.serverUrl}/api/${this.controllerName}/allrecords`;
    let body=selectedFilters;
    return this.http.post(api,body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );

  }
}