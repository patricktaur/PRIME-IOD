import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-study-description',
  templateUrl: './study-description.component.html',
  styleUrls: ['./study-description.component.css']
})
export class StudyDescriptionComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  form = new FormGroup({});
  paramList: any;
  study: any;
  studyDetails: any = {};

  sponsorParId = 1200;
  cdmsParId = 1300;
  therapeuticAreaParid = 1400;
  subTaParid = 8700;
  yesNoParId = 600;
  sOPsParId = 1500;
  ePROParId = 1600;
  eProNonePId = 1603;
  specialPopulationParId = 1900;
  yesNoItems: any = null;

  loading: boolean = false;
  hasDMManagerRole: boolean = false;

  subscription1: Subscription | undefined;
  subscription2: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  constructor(
    public router: Router,
    private actiavtedRoute: ActivatedRoute,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService,
    private tblParamService: TblParamService,
    private studyReviewService: StudyReviewService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // this.subscription2 = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    //   if (this.studyId > 0) {
    //     this.loadStudyDetails(this.studyId);
    //   }
    // });
    
    this.subscription2 = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadStudyDetails(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });

   

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });

    // this.form.disable();
  }

  loadStudyDetails(studyId: number) {
    this.loading = true;
    this.subscription1 = this.studyReviewService.getStudyDetailsDTO(studyId).subscribe(
      (res: any) => {
        // console.log(`response = ${JSON.stringify(res, null, 2)}`)
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyDetails = res;
          // console.log(`study details = ${this.studyDetails, null, 2}`);
          this.form.reset();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  saveStudyDetails() {
    this.loading = true;
    this.saveSubscription = this.studyReviewService.saveStudyDetails(this.studyId, this.studyDetails).subscribe(
      res => {
        this.studyDetails = res;
        //loadStudyProperties is called because:
        //Sponsor - Celgene effects Deliverables/Celgene Dely section visibility
        // Protocol - GSK Vacine effects GSK section visibility
        //Local Labs - Yes - effects Local Labes section visibility
        this.studyEditService.loadStudyProperties();
        this.form.reset();
        this.loading = false;
      },
      err => {
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }

  getDropdownValuesA(): any[] {
    let values = Array.from(this.paramList);
    return values.filter((e: any) => e.parId === 1300).slice();
  }

  getDropdownValues(): any {
    // console.log('length:' + this.paramList?.length);
    return this.paramList?.filter((e: any) => e.parId === 1300);
  }
  loadYesNoItems() {
    this.yesNoItems = this.tblParamService.getParams(this.yesNoParId);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Study Description.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  get eproVendorNameValid() {
    //((a < b) ? 'minor' : 'major');
    // (c.eProPid != this.eProNonePId && (c.eProPid != this.eProNonePId && c.eProvendorName?.length > 0))
    //  expression:  (x : any)  => (x.value?.length > 0) ? false : true,
    //  expression:  (x : any)  => (x.value?.length > 0) ? false : true,
    //expression:  (x : any)  => ((this.studyDetails?.eProPid === this.eProNonePId ) ? false : true)

    return this.studyDetails?.eProPid == this.eProNonePId && this.studyDetails?.eProvendorName?.length > 0
      ? true
      : false;
  }

  model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      templateOptions: { label: 'Details' },
      fieldGroupClassName: 'green-label',
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-4',
              key: 'studyIconNumber',
              type: 'label',
              templateOptions: {
                label: ' ICON Number'
              }
            },
            {
              className: 'col-4',
              key: 'region',
              type: 'label',
              templateOptions: {
                label: 'Region'
              }
            },
            {
              className: 'col-4',

              key: 'portfolio',
              type: 'label',
              templateOptions: {
                label: 'Portfolio'
              }
            }
          ]
        },
        {
          key: 'sponsorPid',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Sponsor',
            helpText: 'Client Name',
            options: this.tblParamService.getParams(this.sponsorParId),
            valueProp: 'recId',
            labelProp: 'description',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },
        {
          key: 'studyName',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Study Name',
            required: true,
            helpText: 'Enter a Name for the study. This should exactly match the study name in EDC.',
            labelColClassName: 'col-md-6',
            fieldColClassName: 'col-md-6'
          },
          validation: {
            show: true
          }
        },
        {
          key: 'studyNameComment',
          type: 'textarea',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Study Name Comment',
            rows: 3,
            helpText: 'Use for comments describing the study',
            placeholder: 'Study Name Comment',
            maxLength: 250,
            description: 'Max 250 characters',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'drtPid',
          type: 'select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'DRT',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',
            required: true,
            labelColClassName: 'col-6',
            fieldColClassName: 'col-4'
          },
          validation: {
            show: true
          }
        },

        {
          key: 'drtlink',
          type: 'textarea',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'DRT Link',
            rows: 3,
            placeholder: 'DRT Link',
            maxLength: 4000,
            description: 'Max 4000 characters',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'cdmsPid',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'CDMS',
            helpText: 'EDC Platform. Note: If more than one CDMS is used, select the main system.',
            options: this.tblParamService.getParams(this.cdmsParId),
            valueProp: 'recId',
            labelProp: 'description',
            required: true,
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },
        {
          key: 'specifyCdms',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Specify CDMS',
            helpText: "If CDMS 'Other' is selected please Specify CDMS",

            placeholder: 'Specify CDMS',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'therapeuticAreaPid',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Therapeutic Area',
            options: this.tblParamService.getParams(this.therapeuticAreaParid),
            required: true,
            valueProp: 'recId',
            labelProp: 'description',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },
        {
          key: 'subTapid',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Sub-TA',
            options: this.tblParamService.getParams(this.subTaParid),
            valueProp: 'recId',
            labelProp: 'description',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },

        {
          key: 'indication',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Indication',
            placeholder: 'Indication',
            helpText: 'Detailed study indication',

            required: true,
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },

        {
          key: 'dmstandalonePid',
          type: 'select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'DM Standalone',
            options: this.tblParamService.getParams(this.yesNoParId),
            helpText: 'If ICON does not provide also some or all  ClinOps services, enter Y; otherwise enter N',
            valueProp: 'recId',
            labelProp: 'description',
            required: true,
            labelColClassName: 'col-6',
            fieldColClassName: 'col-4'
          },
          validation: {
            show: true
          }
        },
        {
          key: 'builddonebyIconPid',
          type: 'select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Database Build by ICON',
            helpText: 'If ICON Contracted for Database Build/CDMS Set-up, enter Y otherwise enter N',

            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',
            required: true,
            labelColClassName: 'col-6',
            fieldColClassName: 'col-4'
          },
          validation: {
            show: true
          }
        },
        {
          key: 'sopsPid',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'SOPs',
            helpText: "If most DM work is performed using sponsor's SOPs, enter Sponsor , otherwise enter ICON",
            options: this.tblParamService.getParams(this.sOPsParId),
            valueProp: 'recId',
            labelProp: 'description',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },

        {
          key: 'eProPid',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'ePRO',
            helpText:
              'For ePRO , enter one of : None, ePRO , Paper , or Both ; Select Both if PRO is collected electronically and on paper.  If PRO data is entered by site in the EDC, enter None.',
            options: this.tblParamService.getParams(this.ePROParId),
            valueProp: 'recId',
            labelProp: 'description',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },
        {
          key: 'eProvendorName',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'ePRO Vendor name',
            helpText:
              'Enter any specific poplulation considered for the study (ie : pediatric) ; if no specific population, enter None ',

            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.eProPid == this.eProNonePId && x.eProvendorName?.length == 0
          }
        },
        {
          key: 'localLabsPid',
          type: 'select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Local Labs',
            helpText: 'If local lab data and normal ranges are collected in the study , enter Y , otherwise enter N',

            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',

            labelColClassName: 'col-6',
            fieldColClassName: 'col-4'
          },
          validation: {
            show: true
          }
        },
        {
          key: 'irisPid',
          type: 'select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'If Local Labs, IRIS',

            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',
            placeholder: '-Select-',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-4'
          },
          expressionProperties: {
            'templateOptions.required': x => x.localLabsPid == 601
          },
          validation: {
            show: true
          }
        },
        {
          key: 'specialPopulationPid',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Special Population',
            helpText:
              'Enter any specific population considered for the study (ie: pediatric).  If no specific population, enter None',

            options: this.tblParamService.getParams(this.specialPopulationParId),
            valueProp: 'recId',
            labelProp: 'description',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'iconCodingPid',
          type: 'select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Icon Coding',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',

            labelColClassName: 'col-6',
            fieldColClassName: 'col-4'
          }
        },

        {
          key: 'medidataMedicalImaging',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Requires Rave Medical Imaging(RMI) EDC? ',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },
        {
          fieldGroupClassName: 'row form-group',
          fieldGroup: [
            {
              className: 'col-3',
              key: 'dTotalDmStudyDurationMonths',
              type: 'label',
              templateOptions: {
                helpText: 'Total DM Study Duration in Months',
                label: 'Total DM Study Duration',
                description: 'Duration in Months'
              }
            },
            // "pagesStillToProcess": -1, "adjustedAvgPagesPerMonth": 0 }
            {
              className: 'col-3',
              key: 'dAvgPagesPerMonth',
              type: 'label',
              templateOptions: {
                label: 'Avg Pages Per Month'
                //description:dAvgPagesPerMonth
              }
            },
            {
              className: 'col-3',
              key: 'specialProject',
              type: 'select',
              // wrappers: ['label'],
              templateOptions: {
                label: 'Special Project',
                options: this.tblParamService.getParams(this.yesNoParId),
                placeholder: '-Select-',
                valueProp: 'recId',
                labelProp: 'description',
                disabled: true
              }
            },
            {
              className: 'col-3',
              key: 'dmpmrequired',
              type: 'select',
              templateOptions: {
                label: 'DMPM Required',
                options: this.tblParamService.getParams(this.yesNoParId),
                valueProp: 'recId',
                labelProp: 'description',
                disabled: true
              }
            }
          ]
        }
      ]
    }
  ];

  submit() {
    if (this.form.valid) {
      this.saveStudyDetails();
    }
  }

  ngOnDestroy() {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
