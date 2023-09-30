import { Injectable, TemplateRef } from '@angular/core';

import * as json2csv from 'json2csv'; // convert json file to csv
import { Parser } from 'json2csv';
import { saveAs } from 'file-saver'; // save the file
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Json2CsvDownloadService {
  Json2csvParser = json2csv.Parser;

  constructor(private datePipe: DatePipe) {}

  public downloadFile(data: any, filename?: string, fields?: any) {
    let csvData = this.convertToCSV(data, fields);
    let file = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(file, filename);
  }

  public convertToCSV(objArray: any, fields?: any) {
    // console.log('Fields XXX:' + JSON.stringify(fields));
    // let objArr = this.addHeadersToObjects(objArray, fields);
    let objFormatted = this.convertFieldFormat(objArray, fields);
    // console.log(`object array = ${JSON.stringify(objArr, null, 2)}`);
    // let json2csvParser = new this.Json2csvParser(fields);
    // let csv = json2csvParser.parse(objArray);

    let json2csvParser = new Parser(fields);
    // let csv = json2csvParser.parse(objArr);
    let csv = json2csvParser.parse(objFormatted);
    // parser.parse(myData)

    // console.log(csv);
    return csv;
  }

  public addHeadersToObjects(objArray: any, fields?: any) {
    let objArr = objArray.map((obj: any, index: number) => {
      const keys = Object.keys(obj);
      let newObj: any = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (fields && fields.find((x: any) => x.field == key)) {
          newObj[fields.find((x: any) => x.field == key).header] = obj[key];
        } else {
          // newObj[key] = obj[key]; //json has additional fields used for filter, they are not part of csv
        }
        // console.log(key, yourObject[key]);
      }
      return newObj;
    });
    // var objArr = JSON.parse(JSON.stringify(objArray), function(k, v) {
    //   if (fields.find((x: any) => x.field == k)) {
    //     this[fields.find((x: any) => x.field == k).header] = v;
    //     return; // if return undefined, orignal property will be removed
    //   }
    //   return v;
    // });
    return objArr;
  }

  public convertFieldFormat(objArray: any, columns?: any) {
    let clonedArray: any = [];
    objArray.forEach((val: any) => clonedArray.push(Object.assign({}, val)));

    clonedArray.forEach((row: any) => {
      columns.forEach((col: any) => {
        if (col.type == 'date') {
          if (row[col.field]) {
            row[col.field] = this.datePipe.transform(row[col.field], 'dd-MMM-yyyy');
          }
        }
      });
    });

    let headerUpdatedRecords = this.addHeadersToObjects(clonedArray, columns);
    return headerUpdatedRecords;
  }
}
