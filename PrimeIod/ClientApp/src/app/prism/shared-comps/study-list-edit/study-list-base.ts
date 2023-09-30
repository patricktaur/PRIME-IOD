import { Component, OnInit, Directive, OnDestroy } from '@angular/core';
import { AppInjector } from '@app/core/services/app-injector.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

@Directive()
export class StudyListBase implements OnInit, OnDestroy {
  // protected logger: LoggerService;
  protected router: Router;
  // protected studyEditService : StudyEditAService;
  protected httpService: StudyHttpService;
  protected modalService: NgbModal;

  loading: boolean = false;
  title: string | undefined;

  studyId: number = 0;
  //   issueTracker: any;

  pageNumber = 1;
  pageSize = 10;

  controllerName: string | undefined;
  actionName: string | undefined;
  keyField: string | any;

  records: any[] = [];

  studyIdSub: Subscription | undefined;
  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
  constructor(
    // public router: Router,
    //do not use AppInjector to inj
    //injecting AppInjector via ActivatedRoute is not recomended
    public actRoute: ActivatedRoute,
    public studyEditService: StudyEditService // public httpService: StudyHttpService, // public modalService: NgbModal
  ) {
    this.router = AppInjector.injector.get(Router);
    //  this.studyEditService  = AppInjector.injector.get(StudyEditAService);
    this.httpService = AppInjector.injector.get(StudyHttpService);
    this.modalService = AppInjector.injector.get(NgbModal);
  }

  ngOnInit(): void {
    this.studyIdSub = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      this.loadRecord(this.studyId, this.controllerName, this.actionName);
    });
  }

  reloadRecords() {
    this.loadRecord(this.studyId, this.controllerName, this.actionName);
  }

  loadRecord(studyId: number | any, controllerName: string | any, actionName: string | any) {
    this.loadRecordSub = this.httpService.getList(studyId, controllerName, actionName).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  onRaiseEvent(value: any) {
    let actionCommand = value?.actionCommand;
    let id = value?.actionValue;
    switch (actionCommand) {
      case 'edit':
        this.edit(id);
        break;
      case 'delete':
        const msg = "Deleting . . .'";
        this.confirmDelete(msg, id);
        break;
      case 'navigateTo':
        this.edit(id);
        break;
      default:
        this.navigateTo(actionCommand, id);
        break;
    }
  }

  add() {
    this.router.navigate(['edit'], {
      relativeTo: this.actRoute.parent,
      queryParams: { editMode: 'add', studyId: this.studyId }
    });
  }

  edit(id: number) {
    this.router.navigate(['edit'], { relativeTo: this.actRoute.parent, queryParams: { id: id } });
  }

  navigateTo(path: string, id: number) {
    this.router.navigate([path], { relativeTo: this.actRoute.parent, queryParams: { id: id } });
  }

  deleteRecord(controllerName: string | any, recId: number) {
    this.deleteRecordSub = this.httpService.deleteRecord(controllerName, recId).subscribe(
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
        if (result === 'confirm') {
          this.deleteRecord(this.controllerName, recId);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  removeRecord(id: number): void {
    let found = false;
    for (let i = 0; i < this.records.length; i++) {
      if (this.records[i][this.keyField] === id) {
        this.records.splice(i--, 1);
        found = true;
      }
    }
    if (found == false) {
      console.log(`No record found for keyfield: ${this.keyField}, keyValue: ${id}`);
    }
  }

  ngOnDestroy(): void {
    this.studyIdSub?.unsubscribe();
    this.loadRecordSub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
  }
}
