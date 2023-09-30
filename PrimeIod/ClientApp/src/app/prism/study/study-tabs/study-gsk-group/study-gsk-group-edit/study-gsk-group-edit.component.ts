import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

import { StudyEditService } from '@app/prism/study/study-edit.service';
// import { StudyReviewService } from '@app/prism/study/study-review.service';

import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { StudyGskGroupService } from '@app/prism/study/study-tabs/study-gsk-group/study-gsk-group.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-study-gsk-group-edit',
  templateUrl: './study-gsk-group-edit.component.html',
  styleUrls: ['./study-gsk-group-edit.component.css']
})
export class StudyGroupEditComponent implements OnInit, OnDestroy {
  title = 'StudyGroup';
  controllerName = 'TblStudyGSKGroup';
  studyId: number | any;
  loading: boolean = false;
  record: any;

  rdcLocationsParId = 7600;
  gskPriorityCategoryParId = 8800;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;

  constructor(
    private location: Location,
    private studyEditService: StudyEditService,
    private studyGskService: StudyGskGroupService,
    private tblParamService: TblParamService //for user with filter dropdown values:
  ) {}
  //todo:
  //formly tabs
  //test for save
  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      if (this.studyId > 0) {
        this.loadGskKpi(this.studyId);
      }
    });
    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadGskKpi(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyGskService.getRecordToEdit(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.form.reset();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  saveRecord() {
    this.loading = true;
    this.saveSubscription = this.studyGskService.addOrUpdate(this.record).subscribe(
      res => {
        this.record = res;
        this.form.reset();
        this.loading = false;
      },
      err => {
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in GSK.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  submit() {
    if (this.form.valid) {
      this.saveRecord();
    }
  }

  back() {
    this.location.back();
  }
  //todo:
  form = new FormGroup({});
  options: FormlyFormOptions | any = {};
  /*
odmName": null, "odmNameComment": null,
"rcdLocation": null, "rcdLocationComment": null, 
"compoundName": null, "compoundNameComment": null },


*/

  //----
  fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      fieldGroup: [
        {
          templateOptions: { label: 'Study Information' },
          // fieldGroupClassName: 'group-a',
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-3 ',
                  template: '<label >ODM Name</label>'
                },
                {
                  className: 'col-5',

                  key: 'odmName',
                  type: 'input'
                },
                {
                  className: 'col-4',

                  key: 'odmNameComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-3 ',
                  template: '<label >RDC Location</label>'
                },
                {
                  className: 'col-5',
                  key: 'rcdLocation',
                  type: 'select',
                  templateOptions: {
                    options: this.tblParamService.getParams(this.rdcLocationsParId),
                    valueProp: 'recId',
                    labelProp: 'description',
                    placeholder: '-Select-'
                  }
                },

                {
                  className: 'col-4',
                  key: 'rcdLocationComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-3 ',
                  template: '<label >Compound</label>'
                },
                {
                  className: 'col-5',
                  key: 'compoundName',
                  type: 'input'
                },
                {
                  className: 'col-4',
                  key: 'compoundNameComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-3 ',
                  template: '<label ><br>Active Study?</label>'
                },
                {
                  className: 'col-5',

                  key: 'activeStatus',
                  type: 'label',
                  wrappers: ['help-text']
                },
                {
                  className: 'col-4',
                  key: 'activeStatusComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-3 ',
                  template: '<label >First Centre Initiation Date</label>'
                },
                {
                  className: 'col-5',

                  key: 'firstCentreInitation',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'firstCentreInitationComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-3 ',
                  template: '<label >GSK Priority Category</label>'
                },
                {
                  className: 'col-5',
                  key: 'gskPriorityCategory',
                  type: 'select',
                  templateOptions: {
                    options: this.tblParamService.getParams(this.gskPriorityCategoryParId),
                    valueProp: 'recId',
                    labelProp: 'description',
                    placeholder: '-Select-'
                  }
                },
                {
                  className: 'col-4',
                  key: 'gskPriorityCategoryComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            }
          ]
        },
        ///
        {
          templateOptions: { label: 'Database Set-up' },
          // fieldGroupClassName: 'group-a',
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template:
                    '<label ># of drafts of eCRF specifications before final sign off during database set-up</label>'
                },
                {
                  className: 'col-2',

                  key: 'eCrfSpecification',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'eCrfSpecificationComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label ># of drafts of eCRF before final sign off during database set-up</label>'
                },
                {
                  className: 'col-2',

                  key: 'eCrf',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'eCrfComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label ># of drafts of iDRP before final sign off during database set-up</label>'
                },
                {
                  className: 'col-2',

                  key: 'iDrf',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'iDrfComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Planned Clinical Database Setup Date</label>'
                },
                {
                  className: 'col-3',

                  key: 'plannedClinicalDatabaseSetupDate',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'plannedClinicalDatabaseSetupDateComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Actual Clinical Database Setup Date</label>'
                },
                {
                  className: 'col-3',

                  key: 'actualClinicalDatabaseSetupDate',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'actualClinicalDatabaseSetupDateComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Planned Data Collection tools go-live Date</label>'
                },
                {
                  className: 'col-3',

                  key: 'plannedDataCollectionToolsGoliveDate',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'plannedDataCollectionToolsGoliveDateComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Actual Data Collection tools go-live Date</label>'
                },
                {
                  className: 'col-3',

                  key: 'actualDataCollectionToolsGoliveDate',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'actualDataCollectionToolsGoliveDateComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            }
          ]
        },
        {
          templateOptions: { label: 'On Study' },
          // fieldGroupClassName: 'group-a',
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label ># EDC PGL</label>'
                },
                {
                  className: 'col-2',

                  key: 'edcPgl',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'edcPglComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label ># EDC PGL due to DM issues caused by CRO</label>'
                },
                {
                  className: 'col-2',

                  key: 'dmIssues',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'dmIssuesComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label >Total # of DM re-queries</label>'
                },
                {
                  className: 'col-2',

                  key: 'dmRequeries',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'dmRequeriesComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label >Total # of DM queries</label>'
                },
                {
                  className: 'col-2',

                  key: 'dmQueries',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'dmQueriesComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label ># of macros requiring reprogramming due to DM issue</label>'
                },
                {
                  className: 'col-2',

                  key: 'reprogrammingDueToDmIssue1',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'reprogrammingDueToDmIssue1Comment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label >Total # of active macros across study</label>'
                },
                {
                  className: 'col-2',

                  key: 'activeMacros1',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'activeMacros1Comment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label ># Program MODS Non-SDTM due to ICON error</label>'
                },
                {
                  className: 'col-2',

                  key: 'noProgramModsNonsdtmDueToIconError',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'noProgramModsNonsdtmDueToIconErrorComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label ># of Data Review meeting per year</label>'
                },
                {
                  className: 'col-2',

                  key: 'noOfDataReviewMeetingPerYear',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'noOfDataReviewMeetingPerYearComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            }
          ]
        },
        {
          templateOptions: { label: 'Study Close Out' },
          // fieldGroupClassName: 'group-a',
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Last Subject Last Visit</label>'
                },
                {
                  className: 'col-3',

                  key: 'lastSubjectLastVisit',
                  type: 'label',
                  templateOptions: {
                    pipe: 'date',
                    pipeFormat: 'dd-MMM-yyyy'
                  }
                },
                {
                  className: 'col-4',

                  key: 'lastSubjectLastVisitComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Planned eCRF Lock Date</label>'
                },
                {
                  className: 'col-3',

                  key: 'plannedECrfLockDate',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'plannedECrfLockDateComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Actual eCRF Lock Date</label>'
                },
                {
                  className: 'col-3',

                  key: 'actualECrfLockDate',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'actualECrfLockDateComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Planned Soft Lock Date</label>'
                },
                {
                  className: 'col-3',

                  key: 'plannedSoftLockDate',
                  type: 'label',
                  templateOptions: {
                    pipe: 'date',
                    pipeFormat: 'dd-MMM-yyyy'
                  }
                },
                {
                  className: 'col-4',

                  key: 'plannedSoftLockDateComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Actual Soft Lock Date</label>'
                },
                {
                  className: 'col-3',

                  key: 'actualSoftLockDate',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'actualSoftLockDateComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Final Lab Data</label>'
                },
                {
                  className: 'col-3',

                  key: 'finalLabDate',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'finalLabDateComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Planned Database Freeze Date</label>'
                },
                {
                  className: 'col-3',

                  key: 'plannedDbFreezeDate',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'plannedDbFreezeDateComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Actual Database Freeze Date</label>'
                },
                {
                  className: 'col-3',

                  key: 'actualDbFreezeDate',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'actualDbFreezeDateComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },

            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label >DBF <= Planned # weeks (no lab data)</label>'
                },
                {
                  className: 'col-2',

                  key: 'dbfLessthenPlanedNoWeeksNoLabData',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'dbfLessthenPlanedNoWeeksNoLabDataComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label >DBF <= Planned # weeks (with lab data)</label>'
                },
                {
                  className: 'col-2',

                  key: 'dbfLessthenPlannedNoWeeksWithLabData',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'dbfLessthenPlannedNoWeeksWithLabDataComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label >No. of DM unlocks</label>'
                },
                {
                  className: 'col-2',

                  key: 'noOfDmUnlocks',
                  type: 'label',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'noOfDmUnlocksComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label >No. of nonDM unlocks</label>'
                },
                {
                  className: 'col-2',

                  key: 'noOfNonDmUnlocks',
                  type: 'label',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'noOfNonDmUnlocksComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label >Reason for Unlock</label>'
                },
                {
                  className: 'col-2',

                  key: 'reasonForUnlock',
                  type: 'label',
                  templateOptions: {}
                },
                {
                  className: 'col-4',

                  key: 'reasonForUnlockComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 ',
                  template: '<label >Total # of Database Unfreeze</label>'
                },
                {
                  className: 'col-2',

                  key: 'totalNoOfDbUnfreeze',
                  type: 'input',
                  templateOptions: {
                    type: 'number'
                  }
                },
                {
                  className: 'col-4',

                  key: 'totalNoOfDbUnfreezeComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            }
          ]
        },
        {
          templateOptions: { label: 'Archiving' },
          // fieldGroupClassName: 'group-a',
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Date of approved CSR</label>'
                },
                {
                  className: 'col-3',

                  key: 'dateOfApprovedCsr',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'dateOfApprovedCsrComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Archival status completed date</label>'
                },
                {
                  className: 'col-3',

                  key: 'archivalStatus',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'archivalStatusComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },

            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >Date of CSR Sign-off</label>'
                },
                {
                  className: 'col-3',

                  key: 'csrSignoff',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'csrSignoffComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-5',
                  template: '<label >InForm Decommissioning Completed Date</label>'
                },
                {
                  className: 'col-3',

                  key: 'informDecommissioning',
                  type: 'date-picker'
                },
                {
                  className: 'col-4',

                  key: 'informDecommissioningComment',
                  type: 'textarea',
                  templateOptions: {
                    placeholder: 'Comment'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  //---

  fieldsX: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',

          key: 'field1',
          type: 'date-picker',
          wrappers: ['help-text'], // included as work around for displaying validataion message

          templateOptions: {
            label: 'Interim Lock',
            required: true
          }
        },
        {
          className: 'col-4',

          key: 'fld2',
          type: 'date-picker',
          templateOptions: {
            label: 'CutOff Date'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',

          key: 'softLockDate',
          type: 'date-picker',
          templateOptions: {
            label: 'SoftLock Date'
          }
        },
        {
          className: 'col-4',

          key: 'hardLockDate',
          type: 'date-picker',
          templateOptions: {
            label: 'HardLock Date'
          }
        }
      ]
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
