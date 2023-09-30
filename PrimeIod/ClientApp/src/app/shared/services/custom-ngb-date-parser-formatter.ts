import { Component, Injectable } from '@angular/core';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class CustomNgbDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      // console.log('parse:date' + JSON.stringify(date));
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    //  return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
    return date ? date.day + this.DELIMITER + this.getMonthName(date.month) + this.DELIMITER + date.year : '';
  }

  getMonthName(month: number): string {
    let monthName: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthName[month - 1];
  }
}
