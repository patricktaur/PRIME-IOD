import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';
import { StudyCDSInstReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-inst-task/study-cds-inst-req.service';

@Component({
  selector: 'app-study-cds-inst-select-task',
  templateUrl: './study-cds-inst-select-task.component.html',
  styleUrls: ['./study-cds-inst-select-task.component.css']
})
export class StudyCdsInstSelectTaskComponent implements OnInit {
  loading: boolean = false;
  @Input() taskId: number | undefined;
  @Output() taskIdToCopy = new EventEmitter<number>();

  selectedTaskId: number | undefined;
  // sourceTaskId : number;

  filterSub: Subscription | undefined;
  loadRecordsSub: Subscription | undefined;

  filterForm = new FormControl('');
  searchResults: any;
  records: any;
  recordCount: number | undefined;
  recordsCountMessage: string | undefined;

  instructionList: any;
  constructor(public activeModal: NgbActiveModal, private studyCDSInstReqService: StudyCDSInstReqService) {}

  ngOnInit(): void {
    // this.loadRecords("-");
    // this.filterSub = this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(searchValue => {
    //   this.loadRecords(searchValue);
    // });
    this.loadInstructionList();
  }

  loadInstructionList() {
    this.loadRecordsSub = this.studyCDSInstReqService.getInstructionList().subscribe(
      (res: any) => {
        this.loading=false;
        this.instructionList = res;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  onItemSelected(value: any) {
    if (value) {
      this.selectedTaskId = value;
    }
  }

  confirmCopyInstructions() {
    this.taskIdToCopy.emit(this.selectedTaskId);
  }

  ngOnDestroy(): void {
    this.filterSub?.unsubscribe();
  }
}
