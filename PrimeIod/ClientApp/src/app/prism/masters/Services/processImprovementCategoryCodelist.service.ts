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
export class ProcessImprovementCategoryCodelistService {
  constructor(private http: HttpClient) {}

  getCategories(): any {
    let api = `${environment.serverUrl}/api/tblProcessImprovementCategoryCodelist/categories-x/`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getSubCategories(parId: number): any {
    let api = `${environment.serverUrl}/api/tblProcessImprovementCategoryCodelist/sub-categories/${parId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
