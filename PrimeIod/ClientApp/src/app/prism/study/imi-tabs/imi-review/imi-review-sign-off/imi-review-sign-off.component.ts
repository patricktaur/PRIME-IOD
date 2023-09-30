import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { prmReviewStatus } from '@app/prism/common/study-enumerators';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { ImiStudyReviewService } from '@app/prism/study/imi-tabs/imi-study-review.service';

import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-imi-review-sign-off',
  templateUrl: './imi-review-sign-off.component.html',
  styleUrls: ['./imi-review-sign-off.component.css']
})
export class ImiReviewSignOffComponent implements OnInit, OnDestroy {
  review: any = {};
  studyId: number = 0;

  reviewCyclePID: number = 2500;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  dmpmConfirmSub: Subscription | undefined;
  dmpmUndosub: Subscription | undefined;
  dmpmManagerConfirmSub: Subscription | undefined;
  dmpmManagerUndoSub: Subscription | undefined;

  constructor(
    public router: Router,
    private studyEditService: StudyEditService,
    private studyService: ImiStudyReviewService,
    private tblParamService: TblParamService,
    private credService: CredentialsService,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType == 'IMI' || st?.studyType == 'DM+IMI') {
        this.studyId = st.studyId;

        this.loadStudyReview(st.studyId);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }
  loadStudyReview(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyService.getStudySignOff(studyId).subscribe(
      (res: any) => {
        // console.log(`res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.review = res;
          this.setUserRoles(this.review);
          this.form.reset();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
    3;
  }

  setUserRoles(model: any): any {
    //values can be modified by DMPM Manager:
    model.canConfirmDMPMManagerReview = this.showDMPMManagerConfirmProjectReviewButton;
    model.canConfirmDMPMReview = this.showDMPMConfirmProjectReviewButton;
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Review Signoff.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'reviewIndex',
          type: 'label',
          // wrappers: ['help-text'],
          templateOptions: {
            label: 'Review No'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'reviewCycle',
          type: 'select',
          templateOptions: {
            label: 'Review Cycle',
            options: this.tblParamService.getParams(this.reviewCyclePID),
            valueProp: 'recId',
            labelProp: 'description',
            required: true,
            validation: {
              messages: {
                pattern: ' Required Field'
              }
            }
          }
        },
        {
          className: 'col-4',
          key: 'newReviewCycleDueDate',
          type: 'label',
          templateOptions: {
            label: 'Next Review Cycle Due Date ',
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          }
        }
      ]
    }
  ];

  dmpmFields: FormlyFieldConfig[] = [
    {
      className: 'col-2 form-group',
      key: 'overallProjectScore',
      type: 'label-color',
      templateOptions: {
        description: 'Score is out of 5',
        label: 'Overall Project Score'
      }
    },
    {
      key: 'watchlistBool', // watchlist
      type: 'checkbox',
      templateOptions: {
        label: 'WatchList'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !x.canConfirmDMPMReview
      }
    }, //
    {
      key: 'watchlistComment', // watchlist
      type: 'textarea',
      templateOptions: {
        label: 'WatchList Comment'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !x.canConfirmDMPMReview
      },
      hideExpression: model => !model.watchlistBool
    },
    {
      key: 'escalatedBool', // watchlist
      type: 'checkbox',
      templateOptions: {
        label: 'Escalated?'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !x.canConfirmDMPMReview
      }
    },
    {
      key: 'escalatedComment', // watchlist
      type: 'textarea',
      templateOptions: {
        label: 'Escalated Comment'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !x.canConfirmDMPMReview
      },
      hideExpression: model => !model.escalatedBool
    }
  ];

  dmpmManagerFields: FormlyFieldConfig[] = [
    {
      className: 'col-2 form-group',
      key: 'overideProjectScore',
      type: 'custom-select',
      wrappers: ['help-text'],
      templateOptions: {
        label: 'Override Project Score',
        description: 'Score is out of 5'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !x.canConfirmDMPMManagerReview
      }
    }
  ];

  saveStudyReview() {
    this.loading = true;
    this.saveSubscription = this.studyService.saveStudyReview(this.studyId, this.review).subscribe(
      res => {
        this.review = res;
        this.setUserRoles(this.review);
        this.form.reset();
        this.loading = false;
        console.log(`success`);
      },
      err => {
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }
  save() {
    //alert("submit");
    if (this.form.valid) {
     // alert("called");
      this.saveStudyReview();
    }
  }

  // Edit_Review = 701,
  //       DMPM_Confirmed = 702,
  //       DMPMManager_Confirmed = 703

  // public DateTime? DmpmReviewedOn { get; set; }
  // public int? DmpmManagerId { get; set; }
  // public DateTime? DmpmManagerReviewedOn { get; set; }
  get dmpmReviewStatus() {
    let retValue = '';

    // if (this.review?.reviewStatusPid == prmReviewStatus.Edit_Review) {
    //   retValue = 'Awaiting Review';
    // } else {
    //   retValue = `Confirmed by ${this.review?.imiPmDisplayName} on ${this.datePipe.transform(
    //     this.review?.imipmReviewedOn,
    //     'dd-MMM-yyyy'
    //   )}`;
    // }

    if (this.review?.imipmReviewedOn) {
      retValue = `Confirmed by ${this.review?.imiPmDisplayName} on ${this.datePipe.transform(
        this.review?.imipmReviewedOn,
        'dd-MMM-yyyy'
      )}`;
    } else {
      retValue = 'Awaiting Review';
    }
    return retValue;
  }

  get dmpmManagerReviewStatus() {
    let retValue = '';

    if (this.review?.reviewStatusPid == prmReviewStatus.DMPMManager_Confirmed) {
      retValue = `Confirmed by ${this.review?.imiPdDisplayName} on ${this.datePipe.transform(
        this.review?.imipmPdReviewedOn,
        'dd-MMM-yyyy'
      )}`;
    } else if (this.review?.reviewStatusPid == prmReviewStatus.DMPM_Confirmed) {
      retValue = 'Awaiting Review';
    } else {
      retValue = 'Awaiting Confirmation by IMIPM';
    }

    return retValue;
  }

  studyReviewStatusInEditMode(): boolean {
    return this.review?.reviewStatusPid == prmReviewStatus.Edit_Review ? true : false;
  }
  studyReviewStatusDMPMConfirmed(): boolean {
    return this.review?.reviewStatusPid == prmReviewStatus.DMPM_Confirmed ? true : false;
  }
  studyReviewStatusDMPMManagerConfirmed(): boolean {
    return this.review?.reviewStatusPid == prmReviewStatus.DMPMManager_Confirmed ? true : false;
  }

  get testUserRoles() {
    return this.credService.userPermissions;
  }

  userIsStudyDMPM() {
    // return this.credService.userHasPermission(`res.${this.review?.studyId}.dmpm`);
    return this.credService.userHasResourcePermission(this.review?.studyId, UserRoles.IMI_PM);
  }

  userIsStudyDmpmManager() {
    // return this.credService.userHasPermission(`res.${this.review?.studyId}.DMPM_Manager`);
    return this.credService.userHasResourcePermission(this.review?.studyId, UserRoles.IMI_PD_PM);
  }

  //ButtonShow-Hide:
  get showDMPMConfirmProjectReviewButton(): boolean {
    return this.userIsStudyDMPM() && this.studyReviewStatusInEditMode() ? true : false;
  }

  get showDMPMUndoProjectReviewButton(): boolean {
    return this.userIsStudyDMPM() && this.studyReviewStatusDMPMConfirmed() ? true : false;
  }
  get showDMPMManagerConfirmProjectReviewButton(): boolean {
    return this.userIsStudyDmpmManager() && this.studyReviewStatusDMPMConfirmed() ? true : false;
  }
  get showDMPMManagerUndoProjectReviewButton(): boolean {
    return this.userIsStudyDmpmManager() && this.studyReviewStatusDMPMManagerConfirmed() ? true : false;
  }
  //----Review Confirm - Undo
  dmpmConfirmProjectReview() {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.confirmationText = `Ready for IMI PD's Review ?`;

    modalRef.result.then(
      result => {
        console.log(`result = ${result}`);
        if (result === 'confirm') {
          this.loading = true;
          this.dmpmConfirmSub = this.studyService.dmpmConfirmProjectReview(this.studyId, this.review).subscribe(
            res => {
              this.review = res;
              this.setUserRoles(this.review);
              this.form.reset();
              this.loading = false;
            },
            err => {
              console.log(`error while confirming IMIPM Review = ${err}`);
              this.loading = false;
            }
          );
        }
      },
      err => {
        return false;
      }
    );
  }

  dmpmUndoProjectReview() {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.confirmationText = 'Undo - Confirm Review ?';

    modalRef.result.then(
      result => {
        console.log(`result = ${result}`);
        if (result === 'confirm') {
          this.loading = true;
          this.dmpmUndosub = this.studyService.dmpmUndoProjectReview(this.studyId, this.review).subscribe(
            res => {
              this.review = res;
              this.setUserRoles(this.review);
              this.form.reset();
              this.loading = false;
            },
            err => {
              console.log(`error while confirming IMIPM Review = ${err}`);
              this.loading = false;
            }
          );
        }
      },
      err => {
        return false;
      }
    );
  }

  dmpmManagerConfirmProjectReview() {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.confirmationText = 'Confirm (by IMI PD)?';

    modalRef.result.then(
      result => {
        console.log(`result = ${result}`);
        if (result === 'confirm') {
          this.loading = true;
          this.dmpmManagerConfirmSub = this.studyService
            .dmpmManagerConfirmProjectReview(this.studyId, this.review)
            .subscribe(
              res => {
                this.review = res;
                this.setUserRoles(this.review);
                this.form.reset();
                this.loading = false;
              },
              err => {
                console.log(`error while confirming IMIPM Review = ${err}`);
                this.loading = false;
              }
            );
        }
      },
      err => {
        return false;
      }
    );
  }
  dmpmManagerUndoProjectReview() {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.confirmationText = 'Undo confirm (by IMI PD) ?';

    modalRef.result.then(
      result => {
        console.log(`result = ${result}`);
        if (result === 'confirm') {
          this.loading = true;
          this.dmpmManagerUndoSub = this.studyService.dmpmManagerUndoProjectReview(this.studyId, this.review).subscribe(
            res => {
              this.review = res;
              this.setUserRoles(this.review);
              this.form.reset();
              this.loading = false;
            },
            err => {
              this.loading = false;
              console.log(`error while confirming IMIPM Review = ${err}`);
            }
          );
        }
      },
      err => {
        return false;
      }
    );
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
    this.dmpmConfirmSub?.unsubscribe();
    this.dmpmUndosub?.unsubscribe();
    this.dmpmManagerConfirmSub?.unsubscribe();
    this.dmpmManagerUndoSub?.unsubscribe();
  }
}
