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
export class PageUploadService {
  controllerName = 'TblStudyPageFlow';
  constructor(private http: HttpClient) {}

  uploadFile(file : File) {
    const api = `${environment.serverUrl}/api/${this.controllerName}/upload`;

    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(api, formData).pipe((response: any) => {
      return response;
    });
  }

  getSampleTemplate() {
    const api = `${environment.serverUrl}/api/${this.controllerName}/template`;

    return this.http.get(api, { responseType: 'blob' }).pipe(
      map(response => {
        return response;
      })
    );
  }

  getUploadHistory() {
    const api = `${environment.serverUrl}/api/${this.controllerName}/upload-history`;

    return this.http.get(api).pipe(
			map(response => {
				return response;
			})
    );
  }
}
