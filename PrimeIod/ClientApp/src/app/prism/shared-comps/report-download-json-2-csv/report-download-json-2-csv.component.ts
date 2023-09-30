import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { saveAs } from 'file-saver';
import { Json2CsvDownloadService } from '@app/shared/services/json-2-csv-download.service';

@Component({
  selector: 'app-report-download-csv-2-json',
  templateUrl: './report-download-json-2-csv.component.html',
  styleUrls: ['./report-download-json-2-csv.component.css']
})
export class ReportDownloadJson2CsvComponent implements OnInit {
  @Input() records: any; //controller end point
  @Input() fields: any;
  @Input() fileName: string = "";
  @Input() appendDateToFiileName: boolean = false;

  constructor(public downloadService: Json2CsvDownloadService) {}

  ngOnInit(): void {}

  downloadReportCSV() {
    var fileName = '';
    fileName = this.fileName;
    if ((this.appendDateToFiileName = true)) {
      const dotPos = fileName.indexOf('.');
      var fileName = fileName.slice(0, dotPos) + '-' + this.getCurrentDate() + fileName.slice(dotPos);
    }
    return this.downloadService.downloadFile(this.records, fileName, this.fields);
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

  get buttonEnabled() {
    return this.records?.length > 0 ? true : false;
  }
}
