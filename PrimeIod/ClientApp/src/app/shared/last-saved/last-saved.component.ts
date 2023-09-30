import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-last-saved',
  templateUrl: './last-saved.component.html',
  styleUrls: ['./last-saved.component.css']
})
export class LastSavedComponent {
  @Input() auditFields: any;

  // updatedOn(): string | null {
  //   if (Array.isArray(this.auditFields)) {
  //     const firstRecord = this.auditFields[0];
  //     // const firstRecord = this.auditFields.shift();
  //     if (firstRecord) {
  //       // return firstRecord.updatedOn ;
  //       return firstRecord.updatedOn ? firstRecord.updatedOn : null ;
  //     }
  //   } else {
  //     return this.auditFields?.updatedOn ? this.auditFields.updatedOn : null;
  //     // return this.auditFields?.updatedOn ;
  //   }
  //   return null;
  // }

  updatedOn(): string | null {
    if (Array.isArray(this.auditFields)) {
      const firstRecord = this.auditFields[0];
      if (firstRecord) {
        if (firstRecord.updatedOn) {
          const utcDate = new Date(firstRecord.updatedOn);
          if (utcDate.getFullYear() === 1){
            return null;
          }
          const localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));
          return localDate.toISOString();
        } else {
          return null;
        }
      }
    } else {
      if (this.auditFields?.updatedOn) {
        const utcDate = new Date(this.auditFields.updatedOn);
        if (utcDate.getFullYear() === 1){
          return null;
        }
        const localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));
        return localDate.toISOString();
      } else {
        return null;
      }
    }
    return null;
  }
  
  
}
