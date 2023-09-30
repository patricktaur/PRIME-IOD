import { Injectable } from '@angular/core';
import { Json2CsvDownloadService } from '@app/shared/services/json-2-csv-download.service';

@Injectable()
export class ImiRaBatchActionService {
  batchActionMode = false;
  defaultBatachActionOptions = { clone: false, markAsCompleted: false, selectedItems: <any>[] };
  batchActionOptions = { ...this.defaultBatachActionOptions }; //{ clone: false, markAsCompleted: false, selectedItems: <any>[] };

  constructor() {}

  addToBatchActions(id: number) {
    let paddedValue = id.toString().padStart(10, ' '); //to enable sorting in batch-action-component
    let item = { taskId: id, displayValue: paddedValue };

    const found = this.batchActionOptions.selectedItems.find((element: any) => {
      if (element.taskId === id) {
        return true;
      }
      return false;
    });
    if (!found) {
      this.batchActionOptions.selectedItems.push(item);
    }
  }

  clear() {
    // console.log('before:' + JSON.stringify(this.batchActionOptions));
    this.batchActionOptions.selectedItems.length = 0; //{ clone: false, markAsCompleted: false, selectedItems: <any>[] };
    // console.log('after:' + JSON.stringify(this.batchActionOptions));
  }
}
