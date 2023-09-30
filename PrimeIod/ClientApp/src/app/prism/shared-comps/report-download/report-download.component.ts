import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-report-download',
  templateUrl: './report-download.component.html',
  styleUrls: ['./report-download.component.css']
})
export class ReportDownloadComponent implements OnInit {
  @Input() reportPath: string | undefined; //controller end point
  @Input() fileName: string = "";
  @Input() appendDateToFileName: boolean | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getReport() {
    let api = `${environment.serverUrl}/` + this.reportPath;
    return this.http.get(api, { reportProgress: true, responseType: 'blob' }).pipe(
      map(response => {
        return response;
      })
    );
  }

  downloadReportCSV() {
    // this.isLoading = true;

    this.getReport().subscribe(
      (res: any) => {
        var fileName = '';
        fileName = this.fileName;
        if ((this.appendDateToFileName = true)) {
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
}
