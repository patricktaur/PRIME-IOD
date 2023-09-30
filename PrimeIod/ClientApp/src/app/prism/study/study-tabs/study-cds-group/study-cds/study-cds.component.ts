import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-study-cds',
  templateUrl: './study-cds.component.html',
  styleUrls: ['./study-cds.component.css']
})
export class StudyCdsComponent implements OnInit, OnDestroy {
  studyId: number | any;
  record: any;
  study: any;

  deliveryTypesParId = 5600;
  yesNoParId = 600;
  cdsNetworkLocationParId = 6300;
  reportingPartnerParId = 5700;

  // localLabTypeParId = 2200;
  // localLabSetupTypeParId = 2300;
  // localLabCleaningGroupParId = 2400;
  // localLabCleaningFrequencyParId = 2500;
  // localLabCleaningWeekParId = 2600;
  // // lastRunDate: 2017-09-05T00:00:00,
  // // nextPlannedRunDate: 2017-10-17T00:00:00,
  // localLabStatusParId = 2700;
  // localLabComments: null,
  localLabCleaningDayParId = 2800;
  rangesEnteredInPid = 7300;

  sasCleaningProcessParId = 7400;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;

  hasDMManagerRole: boolean = false;
  constructor(
    public router: Router,

    private studyEditService: StudyEditService,
    private studyTabService: StudyTabsService,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    //cds is common for DM and IMI Studies:
    this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      if (this.studyId > 0) {
        this.loadRecord(this.studyId);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyCdsDTO(studyId).subscribe(
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
    this.saveSubscription = this.studyTabService.saveStudyCds(this.studyId, this.record).subscribe(
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
      let message = "There are unsaved changes in Local Labs.  Click 'Ok' to continue without saving. ";
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

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      //1
      key: 'clinicalDataDeliveryLeadNameId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Clinical Data ProgrammingLead - Clinical Programming',

        options: this.tblUserService.getUsersWithRole_Cdpl_CdsManager_CdplSdtmProgrammer(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',
        helpText: 'Clinical Data Programming Lead – Clinical Programming	Enter the Clinical Data Delivery Lead Name.',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      //1
      key: 'maintenanceProgrammerId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Maintenance Programmer',

        options: this.tblUserService.getUsersWithRole_CdsProgrammer(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',
        helpText: 'Select Maintenance Programmer',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      //1
      key: 'maintenanceProgrammerBackupId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Maintenance Programmer Backup',

        options: this.tblUserService.getUsersWithRole_CdsProgrammer(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',
        helpText: 'Select Maintenance Programmer Backup',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      //2
      key: 'unblindedClinicalProgrammerPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Unblinded Clinical Programmer',

        options: this.tblUserService.getUsersWithRole_Cdpl_CdsProgrammer(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',
        helpText: 'Unblinded Clinical Programmer',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      //3
      key: 'secondUnblindedClinicalProgrammerPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Second Unblinded Clinical Programmer',

        options: this.tblUserService.getUsersWithRole_Cdpl_CdsProgrammer(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',
        helpText: 'Second Unblinded Clinical Programmer',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      //4
      key: 'leadSdtmNameId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Clinical Data Programming Lead - SDTM Programming',

        options: this.tblUserService.getUsersWithRole_Cdpl_CdsManager_CdplSdtmProgrammer(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',
        helpText: 'Enter the Lead SDTM Name.',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      //5
      key: 'unblindedSdtmProgrammerPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Unblinded SDTM Programmer',

        options: this.tblUserService.getUsersWithRole_Cdpl_CdsProgrammer(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',

        helpText: 'Unblinded SDTM Programmer',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      //6
      key: 'clinicalLeadImiProgramming',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Clinical Data Programming Lead - IMI Programming',

        options: this.tblUserService.getUsersWithRole_Imi_Cdpl(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',
        helpText: 'Enter the Lead IMI Name.',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    //Hidden : UAT Request - Sep 2022
    // {
    //   key: 'numberListingsInProduction',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Number of Programming Units in Production',
    //     type: 'number',
    //     helpText: 'Enter all programs and listings that are in production.',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-4'
    //   }
    // },
    // {
    //   key: 'numberListingsWithSpecsErrors',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Number of Listings with Specs Errors',
    //     type: 'number',
    //     helpText:
    //       'Enter the a number of listings with Specification errors. A review of the programming specs is done by the Lead CDPL and captured in a CDS Spec Error Log eroom. The review focus on the accuracy of the specs: logic, table names, variable names, visit names, etc..The aim is to identify inaccurate specs which would impact the quality of the CDS programming and increase the failures during the validation step. Review occurs before and during 1st round of programming of the listings. Potential errors are discussed with the DMPM/CDL.',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-4'
    //   }
    // },
    // {
    //   key: 'numberListingsWithProgrammingErrors',
    //   type: 'label',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Number of Listings Programming Errors',
    //     hideLabel: true,
    //     helpText: '',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-4'
    //   },
    //   hideExpression: '!(model?.studyType == "DM" || model?.studyType == "DM+IMI")'
    // },
    {
      key: 'deliveryTypes',
      type: 'ng-select', //'multicheckbox',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Data Delivery Types',
        helpText: '',
        // options: this.model.deliveryTypes,
        multiple: true,
        valueProp: 'recId',
        labelProp: 'description',

        options: this.tblParamService.getParams(this.deliveryTypesParId),

        // valueProp: 'value',
        // labelProp: 'label',
        // options: [
        //   { value: 'raw', label: 'Raw' },
        //   { value: 'sdtm', label: 'SDTM' },
        //   { value: 'sacq', label: 'SACQ' },
        //   { value: 'scrf', label: 'SCRF' },
        //   { value: 'postProcessed', label: 'Post Processed' }
        // ],
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'timeSdtmgoLivePlanned',
      type: 'label',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'SDTM Go-Live Date (Planned)',
        helpText: '',
        hideLabel: true,
        pipe: 'date',
        pipeFormat: 'dd-MMM-yyyy',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      hideExpression: '!(model?.studyType == "DM" || model?.studyType == "DM+IMI")'
    },
    {
      key: 'timeSdtmgoLiveActual',
      type: 'label',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'SDTM Go-Live Date (Actual)',
        hideLabel: true,
        helpText: '',
        pipe: 'date',
        pipeFormat: 'dd-MMM-yyyy',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      hideExpression: '!(model?.studyType == "DM" || model?.studyType == "DM+IMI")'
    },
    //Hidden : UAT Request - Sep 2022
    // {
    //   key: 'totalSdtmDatasetsInProduction',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Total SDTM Datasets in Production',
    //     type: 'number',
    //     helpText: 'Enter the an actual number of SDTM datasets in production.',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-4'
    //   }
    // },
    // {
    //   key: 'numberSdtmDatasetsWithProgrammingErrors',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Number of SDTM Datasets with Programming Errors',
    //     type: 'number',
    //     helpText:
    //       'Enter the a number of SDTM datasets that do not pass validation after 2 rounds. A review of the programming errors is done by the CDPL and captured in the CDS Programming Error Log eroom. Note: any amendment to the SDTM programming specifications for the specific dataset turns back the rounds counter to 1 for this dataset. The SDTM error rate is calculated only once by study at Full SDTM GoLive date.',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-4'
    //   }
    // },

    {
      key: 'sasGridpid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'SAS GRID',
        helpText: 'SAS GRID',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        //required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    // {
    //   key: 'cdsnetworkLocationPid',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'CDS Network Location',

    //     options: this.tblParamService.getParams(this.cdsNetworkLocationParId),
    //     valueProp: 'recId',
    //     labelProp: 'description',

    //     placeholder: '-Select-',
    //     //required: true,
    //     helpText: '',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // },
    {
      key: 'cdsnetworkLocationPidlist',
      type: 'ng-multi-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDS Network Location',
        multiple: true,
        options: this.tblParamService.getParams(this.cdsNetworkLocationParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        //required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'cdsComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDS Comments',
        helpText: 'Enter any comments related to CDS',
        rows: 3,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'reportPartnerPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Reporting Partner',
        options: this.tblParamService.getParams(this.reportingPartnerParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        //required: true,
        helpText: 'Choose entity responsible for TFL creation (BioStatistics Services)',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'areStudyFoldersArchivedPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Are Study Folders archived',

        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        //required: true,
        helpText: 'Are Study Folders archived?',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'itArchiveTicketNumber',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'IT Archive Ticket Number',
        type: 'number',
        helpText: 'Enter the IT Archive Ticket Number',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'itArchiveTicketRequestDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'IT Archive Ticker Request Date',
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      }
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
