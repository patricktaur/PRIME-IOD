import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
@Injectable({
  providedIn: 'root'
})
export class FormlyService {
  constructor() {}

  isFormlyDirty(form: FormGroup, fields: FormlyFieldConfig[]) {
    let targetProp = 'key';
    let targetValue = '';
    let finalResults: string[] = [];
    this.findObjects(fields, targetProp, targetValue, finalResults);
    return this.isFormDirty(form, finalResults);
  }

  isFormDirty(form: FormGroup, formControlNames: string[]) {
    var isTrue: boolean = false;
    formControlNames.forEach(ky => {
      if (form.controls[ky].dirty === true) {
        isTrue = true;
        return;
      }
    });
    return isTrue;
  }

  isFormlyValid(form: FormGroup, fields: FormlyFieldConfig[]) {
    let targetProp = 'key';
    let targetValue = '';
    let finalResults: string[] = [];
    this.findObjects(fields, targetProp, targetValue, finalResults);
    return this.isFormValid(form, finalResults);
  }

  isFormValid(form: FormGroup, formControlNames: string[]) {
    var isTrue: boolean = false;
    formControlNames.forEach(ky => {
      //if (form.controls[keyValue].valid != true) {
      if (form.controls[ky].valid != true) {
        isTrue = false;
        return;
      }
    });
    return isTrue;
  }

  // isFormDirty(form: FormGroup, fields: FormlyFieldConfig[]) {
  //   var isTrue: boolean = false;
  //   fields.forEach(fld => {
  //     const keyValue = fld?.key?.toString();
  //     if (form.controls[keyValue].dirty === true) {
  //       isTrue = true;
  //       return;
  //     }
  //   });
  //   return isTrue;
  // }
  isFormValidX(form: FormGroup, fields: FormlyFieldConfig[]) {
    var isTrue: boolean = true;
    fields.forEach((fld: any) => {
      const keyValue: string = fld?.key?.toString();
      if (form.controls[keyValue].valid != true) {
        isTrue = false;
        return;
      }
    });
    return isTrue;
  }

  findObjects(obj: any, targetProp: any, targetValue: any, finalResults: any) {
    function getObject(theObject: any) {
      let result = null;
      if (theObject instanceof Array) {
        for (let i = 0; i < theObject.length; i++) {
          getObject(theObject[i]);
        }
      } else {
        for (let prop in theObject) {
          if (theObject.hasOwnProperty(prop)) {
            if (prop === targetProp) {
              // console.log('--found id' + theObject[prop]);
              // console.log("PROP: " + prop + ': ' + theObject[prop]);
              if (prop != undefined && theObject) {
                let value = theObject[prop];
                // console.log('Value:' + value);
                if (value != undefined) {
                  if (finalResults.indexOf(value) === -1) {
                    finalResults.push(value);
                  }
                }
                // finalResults.push(theObject[prop]);
              }

              // if (theObject[prop] === targetValue) {
              //   console.log('----found porop', prop, ', ', theObject[prop]);
              //   finalResults.push(theObject);
              // }
            }
            if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
              getObject(theObject[prop]);
            }
          }
        }
      }
    }

    getObject(obj);
  }
}
