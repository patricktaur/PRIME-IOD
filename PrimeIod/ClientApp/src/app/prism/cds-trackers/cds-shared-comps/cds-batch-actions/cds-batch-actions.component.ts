import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { BatchActionService } from '@app/prism/cds-trackers/cds-shared-comps/batch-action.service';

@Component({
  selector: 'app-cds-batch-actions',
  templateUrl: './cds-batch-actions.component.html',
  styleUrls: ['./cds-batch-actions.component.css']
})
export class CdsBatchActionsComponent implements OnInit {
  @Output() batchActionButtonClicked = new EventEmitter<any>();
  @Output() process = new EventEmitter<any>();
  // @Input() batchActionItems: any = [];
  @Input() batchActionOptions: any = {};
  // @Input() serviceInstance: string = '';
  @Input() batchActionMode = false;
  // @Input() batchActionMode = false;
  form = new FormGroup({});
  batchActionTitle = '';

  // batchOptions = { clone: false, markAsCompleted: false };
  constructor() // @Inject('cds-output-batch-actions') private batchActionService: BatchActionService
  {}

  ngOnInit(): void {
    //  this.batchActionMode = this.batchActionOptions.selectedItems.length > 0;
  }

  batchAction() {
    this.batchActionMode = !this.batchActionMode;
    // this.batchActionService.batchActionMode = this.batchActionMode;
    this.batchActionButtonClicked.emit(this.batchActionMode);
  }

  removeClicked(value: number) {
    const index = this.batchActionOptions.selectedItems.findIndex((item: any) => item.taskId === value);
    this.batchActionOptions.selectedItems.splice(index, 1);
  }

  getTitle() {
    let title = '';
    if (this.batchActionMode == true) {
      title = 'Close Batch Actions';
    } else {
      title = 'Switch to Batch Actions';
    }
    return title;
  }

  clearClicked() {
    // this.batchActionService.clear();
    //this.batchActionOptions.batchActionItems = this.batchActionService.batchActionOptions;
    this.batchActionOptions.selectedItems.length = 0;
  }

  get sortedList() {
    return this.batchActionOptions.selectedItems.sort((a: any, b: any) => (a.displayValue < b.displayValue ? -1 : 1));
  }

  get processMessage() {
    let message = '';
    let and = '';
    message = this.batchActionOptions.clone == true ? 'Clone' : '';
    and = message.length > 0 ? ' and ' : '';
    message = message + (this.batchActionOptions.markAsCompleted == true ? and + 'Mark as Completed' : '');
    message = message + ' ' + this.batchActionOptions.selectedItems.length + ' item(s) ? ';
    return message;
  }

  processdButtonEnabled() {
    return (
      this.batchActionOptions.selectedItems.length > 0 &&
      (this.batchActionOptions.clone == true || this.batchActionOptions.markAsCompleted == true)
    );
  }

  processClicked() {
    this.process.emit(this.batchActionOptions);
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'clone',
      type: 'checkbox',

      templateOptions: {
        label: 'Clone'
      }
    },
    {
      key: 'markAsCompleted',
      type: 'checkbox',

      templateOptions: {
        label: 'Mark as Completed'
      }
    }
  ];
}
