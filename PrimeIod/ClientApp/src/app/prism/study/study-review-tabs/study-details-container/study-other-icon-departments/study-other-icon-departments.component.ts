import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
@Component({
  selector: 'app-study-other-icon-departments',
  templateUrl: './study-other-icon-departments.component.html',
  styleUrls: ['./study-other-icon-departments.component.css']
})
export class StudyOtherIconDepartmentsComponent implements OnInit, OnDestroy {
  hasAdminRole:boolean=false;
  studyId: number = 0;
  form = new FormGroup({});
  paramList: any;
  study: any;
  studyDetails: any;

  //otherIconDeptImiPid
  fetchedOtherIconDeptImiPid: number | undefined;
  fetchedCentralMonitoringId: number | undefined;

  yesNoParId = 600;
  yesNoItems: any = null;

  loading: boolean = false;

  subscription1: Subscription | undefined;
  subscription2: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  constructor(
    public router: Router,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService,
    private tblParamService: TblParamService,
    private studyReviewService: StudyReviewService
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

    this.hasAdminRole = this.credentialsService.userHasRolePermission(UserRoles.Admin);
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
          this.fetchedOtherIconDeptImiPid = res.otherIconDeptImiPid;
          this.fetchedCentralMonitoringId = res.centralMonitoringId;
          this.form.reset();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  get otherIconDeptImiIsModified() {
    return this.studyDetails?.otherIconDeptImiPid != this.fetchedOtherIconDeptImiPid ? true : false;
  }

  get otherIconDeptImiMessage() {
    return this.otherIconDeptImiIsModified
      ? this.studyDetails?.otherIconDeptImiPid == 601
        ? "IMI is changed to  'Yes'.  On Save, IMI Section will be created"
        : "IMI is changed to 'No'.  On Save, IMI Section will be removed."
      : '';
  }

  get centralMonitoringIsModified() {
    return this.studyDetails?.centralMonitoringId != this.fetchedCentralMonitoringId ? true : false;
  }

  get centralMonitoringMessage() {
    return this.centralMonitoringIsModified
      ? this.studyDetails?.centralMonitoringId == 601
        ? "Central Monitoring is changed to  'Yes'.  On Save, CRM Section will be created"
        : "Central Monitoring is changed to 'No'.  On Save, CRM Section will be removed."
      : '';
  }

  saveStudyDetails() {
    this.loading = true;
    this.saveSubscription = this.studyReviewService.saveStudyDetails(this.studyId, this.studyDetails).subscribe(
      (res: any) => {
        this.studyDetails = res;
        this.fetchedOtherIconDeptImiPid = res.otherIconDeptImiPid;
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

  loadYesNoItems() {
    this.yesNoItems = this.tblParamService.getParams(this.yesNoParId);
  }

  get centralMonitoringFieldDisable() {
    return this.studyDetails?.otherIconDeptImiPid === 601 ? true : false;
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message =
        "There are unsaved changes in Study Other Icon Departments.  Click 'Ok' to continue without saving. ";
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
      key: 'otherIconDeptClinicalPid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Clinical',
        helpText: 'If contract includes ICON services from this Dept, enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'otherIconDeptClinicalMonitoringPid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Clinical Monitoring',
        helpText: 'If contract includes ICON services from this Dept, enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'otherIconDeptMedicalPid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Medical',
        helpText: 'If contract includes ICON services from this Dept, enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'otherIconDeptLabPid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Lab',
        helpText: 'If contract includes ICON services from this Dept, enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'otherIconDeptFirecrestPid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Firecrest',
        helpText: 'If contract includes ICON services from this Dept, enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'otherIconDeptBiostatsPid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'BioStatistics',
        helpText: 'If contract includes ICON services from this Dept, enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'otherIconDeptECoaPid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'COT',
        helpText: 'If contract includes ICON services from this Dept, enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
      }
    },

    {
      key: 'otherIconDeptItgPid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'IRT',
        helpText: 'If contract includes ICON services from this Dept, enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'otherIconDeptImiPid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'IMI',
        helpText: 'If contract includes ICON services from this Dept, enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
      },

      expressionProperties: {
        //'templateOptions.disabled': x => x.centralMonitoringId === 601,
        'templateOptions.description': x => (x.centralMonitoringId === 601 ? 'DM+CMR Study' : '')
      }
    },
    {
      key: 'otherIconDeptIdeapid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'IDEA',
        helpText: 'If contract includes ICON services from this Dept, enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'otherIconDeptIconikPid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICONIK',
        helpText: 'If contract includes Iconik, enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'centralMonitoringId',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Central Monitoring',
        helpText: 'If contract includes Central Monitoring (CRM), enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-3',
        fieldColClassName: 'col-4'
        //  disabled: this.centralMonitoringFieldDisable
      },
      expressionProperties: {
        'templateOptions.disabled': x =>x.centralMonitoringId === 601 || x.otherIconDeptImiPid === 601  ? true:false,
        'templateOptions.description': x => (x.otherIconDeptImiPid === 601 ? 'DM+IMI Study.' : '')
        //'templateOptions.disabled': x =>(this.hasAdminRole ==true ? false: (x.centralMonitoringId === 601 ? true:false)),
      }
    }
    // ,
    // {
    //   key: 'centralMonitoring',
    //   type: 'label',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Central Monitoring',
    //     labelColClassName: 'col-3',
    //     fieldColClassName: 'col-4'
    //   }
    // }
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
