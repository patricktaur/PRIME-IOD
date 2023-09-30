import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-report-download-server-side-filters',
  templateUrl: './report-download-server-side-filters.component.html',
  styleUrls: ['./report-download-server-side-filters.component.css']
})
export class ReportDownloadServerSideFiltersComponent implements OnInit, OnDestroy {
  @Input() reportPath: string | undefined; //controller end point
  @Input() fileName: string = "";
  @Input() appendDateToFiileName: boolean = false;
  @Input() filters: any;
  @Input() disabled = false;

  isLoading = false;
  loadSub: Subscription | undefined;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getReport(filters: any) {
    let api = `${environment.serverUrl}/` + this.reportPath;
    //alert(api);

    //ref: https://github.com/angular/angular/issues/18586
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),

      responseType: 'blob' as 'blob'
    };

    const body = JSON.stringify(filters);
    // let api = `${environment.serverUrl}/api/${reportName}/report-list-s`;
    this.isLoading = true;
    return this.http.post(api, body, options).pipe(
      map(response => {
        this.isLoading = false;
        return response;
      })
    );
  }

  downloadReportCSV() {
    // this.isLoading = true;
   // alert("called");

    this.loadSub = this.getReport(this.filters).subscribe(
      (res: any) => {
        console.log('res:' + JSON.stringify(res));
        var fileName = '';
        fileName = this.fileName;
        if ((this.appendDateToFiileName = true)) {
          const dotPos = fileName.indexOf('.');
          var fileName = fileName.slice(0, dotPos) + '-' + this.getCurrentDate() + fileName.slice(dotPos);
        }

        saveAs(res, fileName);
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  getCurrentDate() {
    var date = new Date();
    return this.getFormattedDate(date);
  }

  getFormattedDate(date: Date) {
    var Str =
      // ("00" + (date.getMonth() + 1)).slice(-2)
      ('00' + date.getDate()).slice(-2) +
      this.getMonthName(date.getMonth()) +
      date.getFullYear() +
      ' ' +
      ('00' + date.getHours()).slice(-2) +
      ':' +
      ('00' + date.getMinutes()).slice(-2) +
      ':' +
      ('00' + date.getSeconds()).slice(-2);
    return Str;
  }

  getMonthName(monthNumber: number) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[monthNumber];
  }

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
