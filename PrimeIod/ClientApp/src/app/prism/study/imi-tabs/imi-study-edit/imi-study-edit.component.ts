import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
//for user
import { UserRoles } from '@app/core/authentication/credentials.enums';

//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

// import { RequestsStudyService } from '@app/prism/requests/study-requests/requests-study-.service';
import { RequestsIMIStudyService } from '@app/prism/requests/imi-study-requests/requests-imi-study-.service';

import { CredentialsService } from '@app/core/authentication/credentials.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { ImiStudyReviewService } from '@app/prism/study/imi-tabs/imi-study-review.service';


@Component({
  selector: 'app-imi-study-edit',
  templateUrl: './imi-study-edit.component.html',
  styleUrls: ['./imi-study-edit.component.css']
})
export class ImiStudyEditComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  loading: boolean = false;
  title = 'Edit IMI Study';
  controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  record: any;
  currentUser: any;

  regionParId = 1000;
  portfolioParId = 1100;
  sponsorParId = 1200;
  protocolPhaseParId = 300;
  cdmsParId = 1300;
  therapeuticAreaParid = 1400;
  subTaParid = 8700;
  yesNoParId = 600;
  sOPsParId = 1500;
  ePROParId = 1600;
  eProNonePId = 1603;
  specialPopulationParId = 1900;
  yesNoItems: any = null;
  clinicalResearchOrIconFunctional = 6400;
  imiCdms = 11372; //check value in staging and prod

  //User Table contains two special records:
  //recId 690 - Clinical Data Programming Lead Not Required
  //recId 790 - Clinical Programming Lead Not Assigned
  //and are used in cds sdtm programmer drop down selection.
  sdtmNotRequired = 690; // UerId -2
  sdtmNotAssigned = 724; //UserId -1
  //expressionProperties users hard coded values -as  variables could not be used

  iconNumberInStudy: string = '';

  submitForApprovalButton: boolean = false;
  withdrawRequestButton: boolean = false;
  // F: boolean = false;
  saveButton: boolean = false;
  removeButton: boolean = false;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private credSerivce: CredentialsService,
    private studyEditService: StudyEditService,
    private studyReviewService: ImiStudyReviewService,
    private requestsService: RequestsIMIStudyService //for user with filter dropdown values: //private tblParamService: TblParamService
  ) {}

  ngOnInit(): void {
    this.loadRecordSub = this.studyEditService.getStudyProperties().subscribe((st: any) => {
    

      if (st?.studyType == 'IMI' || st?.studyType == 'DM+IMI') {
        this.studyId = st.studyId;

        this.loadRecord(st.studyId);
      }

      // if (st?.studyType == 'DM') {
      //   this.router.navigate(['/study/review']);
      // }
    });
  }

 
  loadRecord(studyId: number) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.studyReviewService.getStudyDetailsDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Study Request.  Click 'Ok' to continue without saving. ";
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
    if (this.form.dirty) {
      this.validateAndSubmitForApproval();
    }
  }

  validateAndSubmitForApproval() {
    this.iconNumberInStudy = '';
    const firstIconNumber = this.record?.firstIconNumber;
    const secondIconNumber = this.record?.secondIconNumber;

    this.loadNewRecordSub = this.requestsService
      .iconNumberandStudyIdExists(firstIconNumber, secondIconNumber,this.studyId)
      .subscribe((res: boolean | any) => {
        if (res == true) {
          //found
          this.iconNumberInStudy = firstIconNumber + '/' + secondIconNumber;
        }

        if (this.iconNumberInStudy.length == 0) {
          this.saveIMIStudyEdit();
        }
      });
  }

  saveIMIStudyEdit() {
    if (this.form.valid) {
      this.loading = true;

      this.addUpdateSub = this.requestsService.saveIMIStudyEdit(this.record).subscribe(
        res => {
          this.form.reset();
          this.location.back();
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(`error while editing = ${err}`);
        }
      );
    }
  }


  back() {
    this.location.back();
  }

  iconNumberExists(): boolean {
    const firstIconNumber = this.record?.firstIconNumber;
    const secondIconNumber = this.record?.secondIconNumber;

    this.deleteRecordSub = this.requestsService
      .iconNumberExists(firstIconNumber, secondIconNumber)
      .subscribe((res: boolean | any) => {
        return res;
      });

    return false;
  }

 

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Study Icon Number</label>'
        },

        {
          className: 'col-3',

          key: 'firstIconNumber',
          type: 'input',

          templateOptions: {
            required: true,
            // type: 'number',
            minLength: 4,
            maxLength: 4
          },
          // expressionProperties: {
          //   'templateOptions.disabled': x => !this.saveButton
          // },
          validation: {
            show: true
          }
        },
        {
          className: 'col-1',
          template: '<label >-</label>'
        },
        {
          className: 'col-3',

          key: 'secondIconNumber',
          type: 'input',

          templateOptions: {
            required: true,
            // type: 'number',
            minLength: 4,
            maxLength: 4
          },
          // expressionProperties: {
          //   'templateOptions.disabled': x => !this.saveButton
          // },
          validation: {
            show: true
          }
        }
      ]
    },

    {
      key: 'studyName',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Study Name',
        required: true,
        helpText: 'Enter a Name for the study. This should exactly match the study name in EDC.',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },
    {
      key: 'regionPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Region',
        required: true,

        options: this.tblParamService.getParams(this.regionParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },
    {
      key: 'portfolioPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Portfolio',
        required: true,

        options: this.tblParamService.getParams(this.portfolioParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },

    {
      key: 'specialProjectPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Special Project',
        required: true,

        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },
    {
      key: 'dmpmrequiredPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'IMI PM Required',
        required: true,

        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },
    

    {
      key: 'sponsorPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sponsor',
        required: true,

        options: this.tblParamService.getParams(this.sponsorParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },

    
  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
  }
}
