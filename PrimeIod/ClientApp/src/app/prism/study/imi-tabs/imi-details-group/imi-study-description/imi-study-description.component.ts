import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
// import { StudyReviewService } from '@app/prism/study/study-review.service';
import { ImiStudyReviewService } from '@app/prism/study/imi-tabs/imi-study-review.service';

@Component({
  selector: 'app-imi-study-description',
  templateUrl: './imi-study-description.component.html',
  styleUrls: ['./imi-study-description.component.css']
})
export class ImiStudyDescriptionComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  form = new FormGroup({});
  paramList: any;
  study: any;
  studyDetails: any;

  sponsorParId = 1200;
  // cdmsParId = 1300;
  imiCdmsParId = 11372;
  therapeuticAreaParid = 1400;
  subTaParid = 8700;
  yesNoParId = 600;
  sOPsParId = 1500;
  ePROParId = 1600;
  eProNonePId = 1603;
  specialPopulationParId = 1900;
  yesNoItems: any = null;

  loading: boolean = false;

  subscription1: Subscription | undefined;
  subscription2: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  constructor(
    public router: Router,

    private studyEditService: StudyEditService,
    private tblParamService: TblParamService,
    private studyReviewService: ImiStudyReviewService,
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
      if (st?.studyType?.startsWith('IMI')) {
        this.studyId = st.studyId;
        this.loadStudyDetails(st.studyId);
      }
      // if (st?.studyType?.startsWith('DM')) {
      //   this.router.navigate(['/study/review']);
      // }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadStudyDetails(studyId: number) {
    this.loading = true;
    this.subscription1 = this.studyReviewService.getStudyDetailsDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyDetails = res;
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
    console.log('length:' + this.paramList?.length);
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
              key: 'regionPDescription',
              type: 'label',
              templateOptions: {
                label: 'Region'
              }
            },
            {
              className: 'col-4',

              key: 'portfolioPDescription',
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
            label: 'Protocol Name',
            required: true,
            helpText: 'Enter a Name (Protocol) for the study. This should exactly match the Protocol name in EDC.',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },

        {
          key: 'imicdmspid',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'IMI CDMS',
            // helpText: 'EDC Platform. Note: If more than one CDMS is used, select the main system.',
            options: this.tblParamService.getParams(this.imiCdmsParId),
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
          key: 'otherIconDeptImiPid',
          type: 'select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Other Icon Dept : IMI',
            helpText: 'If contract includes ICON services from this Dept, enter Y , otherwise enter N',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',

            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
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
