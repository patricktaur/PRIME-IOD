import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
// import { StudyEditAService } from '@app/prism/study/study-edit.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

// import { ProjectIssueTrackerService } from '@app/prism/study/study-review/project-issue-tracker/project-issue-tracker.service';
import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';

@Component({
  selector: 'app-study-list-base',
  templateUrl: './study-list-base.component.html',
  styleUrls: ['./study-list-base.component.css']
})
export class StudyListBaseComponent implements OnInit, OnChanges {
  @Input() title: string | undefined;
  @Input() keyField: string = 'recId';
  @Input() studyId: number = 0;
  @Input() columns: any;
  @Input() controllerName: any;
  @Input() messageFieldForDelete: string = '';
  @Input() displayJson: boolean = false; //for debugging purpose
  @Input() viewMode: boolean = false;
  columnsPlusEditDelete: any;

  isLoading: boolean = false;
  records: any;

  pageNumber = 1;
  pageSize = 50;

  constructor(
    private httpService: StudyHttpService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    //console.log("messageFieldForDelete" + this.messageFieldForDelete);
    this.editDelColumns[1].actionTextField = this.messageFieldForDelete;
    this.editDelColumns[0].linkField = this.keyField;
    this.editDelColumns[1].actionField = this.keyField;

    // if (this.viewMode) {
    //   this.columnsPlusEditDelete = this.columns;
    // } else {
    //   this.columnsPlusEditDelete = this.editDelColumns?.concat(this.columns);
    // }

    this.loadRecord(this.controllerName, this.studyId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadRecord(this.controllerName, this.studyId);
  }

  get filteredColumns(){
    if (this.viewMode) {
      return this.columns;
    } else {
      return this.editDelColumns?.concat(this.columns);
    }

  }

  loadRecord(controllerName: string, studyId: number) {
    console.log(`controller name = ${controllerName}`);
    console.log(`studyId = ${studyId}`);
    this.httpService.getList(studyId, controllerName).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
          console.log(this.records);
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  add() {
    this.router.navigate(['edit'], {
      relativeTo: this.actRoute.parent,
      queryParams: { editMode: 'add', studyId: this.studyId }
    });
  }

  removeRecord(id: number): void {
    for (let i = 0; i < this.records.length; i++) {
      //if (this.records[i].recId === id) {
      let row = this.records[i];
      if (this.records[i][this.keyField] === id) {
        this.records.splice(i--, 1);
      }
    }
  }

  dataTableEvent(value: any) {
    // {"actionCommand":"delete","actionValue":1}
    let actionCommand = value?.actionCommand;
    switch (actionCommand) {
      case 'delete':
        const msg = "Deleting '" + value?.actionTextField + "' ...";
        this.confirmDelete(msg, value?.actionValue);
        break;

      default:
        break;
    }
    // if (this.confirmDelete("The record will be deleted ...") === true){
    //   alert('In Project Issue Tracker xyz:' + JSON.stringify(value));
    // }
  }

  editDelColumns: any = [
    {
      header: 'Edit',

      actionType: 'link',
      linkField: 'recId',
      linkText: 'Edit',
      linkPath: 'edit'
    },
    {
      header: 'Delete',
      actionType: 'raise-event',
      linkText: 'Delete',
      actionCommand: 'delete',
      actionField: 'recId',
      actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    }
  ];

  deleteRecord(controllerName: string, recId: number) {
    this.httpService.deleteRecord(controllerName, recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:
          this.removeRecord(recId);
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  confirmDelete(message: any, recId: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.confirmationText = message;

    modalRef.result.then(
      result => {
        console.log(`result = ${result}`);
        if (result === 'confirm') {
          this.deleteRecord(this.controllerName, recId);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }
}
