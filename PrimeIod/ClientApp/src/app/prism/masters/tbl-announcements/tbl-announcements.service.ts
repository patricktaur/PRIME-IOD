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
export class TblAnnouncementsService {
  constructor(private http: HttpClient) {}

  getTblAnnouncementsList() {
    let api = `${environment.serverUrl}/api/tblAnnouncements`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRecordsBasedOnSearch(searchText: string, pageNo: any, pageSize: any) {
    const api =
      environment.serverUrl +
      '/api/tblAnnouncements/search?SearchFor=' +
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

  getTblAnnouncements(id: string) {
    const api = environment.serverUrl + '/api/tblAnnouncements/' + id;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addTblAnnouncements(tblAnnouncements: any) {
    const api = environment.serverUrl + '/api/tblAnnouncements/add';
    const body = JSON.stringify(tblAnnouncements);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateTblAnnouncements(tblAnnouncements: any) {
    const api = environment.serverUrl + '/api/tblAnnouncements/edit';
    const body = JSON.stringify(tblAnnouncements);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteTblAnnouncements(tblAnnouncements: any) {
    const api = environment.serverUrl + '/api/tblAnnouncements/delete?tblAnnouncementsId=' + tblAnnouncements.recId;
    return this.http.delete(api).pipe(
      map(response => {
        return response;
      })
    );
  }
}
