import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { JsonPipe } from '@angular/common';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TblCdsOutputCategoryCodelistService {
  constructor(private http: HttpClient) {}

  getCdsOutputCategory(): any {
    let api = `${environment.serverUrl}/api/TblCdsoutputCategoryCodelist/all/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCdsOutputSubCategory(childItemId: number): any {
    let api = `${environment.serverUrl}/api/TblCdsoutputCategoryCodelist/GetListByParId/${childItemId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
