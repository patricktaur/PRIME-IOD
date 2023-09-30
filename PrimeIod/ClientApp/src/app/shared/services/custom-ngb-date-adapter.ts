import { Component, Injectable } from '@angular/core';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class CustomNgbDateAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let pos = value.indexOf('T');
      if (pos > 0) {
        value = value.substr(0, pos);
      }

      //fromat from api: 2016-12-23T00:00:00
      let date = value.split(this.DELIMITER);
      return {
        // day : parseInt(date[0], 10),
        // month : parseInt(date[1], 10),
        // year : parseInt(date[2], 10)

        year: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        day: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    //2016-12-23T00:00:00
    // return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : null;
  }
}
