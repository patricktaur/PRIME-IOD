import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() {}

  getLocalTimeString(dateTime: any) {
    if (environment.production) {
      return dateTime + 'z';
    } else {
      return dateTime;
    }
  }

  getDateFormatForDatePicker(DateObj: any) {
    console.log(`date = ${DateObj}`);
    if (DateObj) {
      const dueDate = new Date(this.getLocalTimeString(DateObj));
      console.log(`dueDate.toISOString().substring(0, 10) = ${dueDate.toISOString().substring(0, 10)}`);
      return dueDate.toISOString().substring(0, 10);
    }
    return null;
  }

  getTimeFormatForTimePicker(Dateobj: any) {}

  getReadableDate(dateTime: any) {
    if (dateTime != null) {
      return moment(this.getLocalTimeString(dateTime)).format('LL');
    } else {
      return null;
    }
  }

  secondsToHoursMinutesSeconds(timeInSeconds: any) {
    timeInSeconds = Number(timeInSeconds);
    var hours = Math.floor(timeInSeconds / 3600);
    var mins = Math.floor((timeInSeconds % 3600) / 60);
    var seconds = Math.floor((timeInSeconds % 3600) % 60);

    var hoursDisplay = hours < 9 ? '0' + hours + ':' : hours + ':';
    var minutesDisplay = mins < 9 ? '0' + mins + ':' : mins + ':';
    var secondsDisplay = seconds < 9 ? '0' + seconds + '' : seconds + '';
    return hoursDisplay + minutesDisplay + secondsDisplay;
  }

  getSecondsToLocalTimeString(timeInSeconds: any) {
    var duration = moment.duration(timeInSeconds);
    return duration.humanize();
  }

  getStartDateOfMonth(): any {
    return moment()
      .startOf('month')
      .toISOString();
  }

  getEndDateOfMonth(): any {
    return moment()
      .endOf('month')
      .toISOString();
  }

  getTodaysDate(): any {
    return (
      moment()
        // .toDate()
        .toISOString()
    );
  }
}
