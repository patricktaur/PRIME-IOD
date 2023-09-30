import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
@Component({
  selector: 'app-study-assumptions',
  templateUrl: './study-assumptions.component.html',
  styleUrls: ['./study-assumptions.component.css']
})
export class StudyAssumptionsComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  studyAssumptions: any = {};
  study: any;

  protocolPhaseParId = 300;
  protocolComplexityParId = 400;
  rescueStudyParId = 600;
  yesNoParId = 600;
  tmfParID = 3800;
  yesNoNaParId = 7500;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  constructor(
    public router: Router,
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService,
    private tblParamService: TblParamService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadStudyAssumptions(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadStudyAssumptions(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyAssumptionsDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyAssumptions = res;
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

  saveStudyAssumptions() {
    this.loading = true;
    console.log(`studyAssumptions = ${JSON.stringify(this.studyAssumptions, null, 2)}`);
    this.saveSubscription = this.studyReviewService.saveStudyAssumptions(this.studyId, this.studyAssumptions).subscribe(
      res => {
        this.studyAssumptions = res;
        //loadStudyProperties is called because:
        //QMFQCPeriodicity values effects Quality/CMF QC setion visibility
        //EDCAccessReviewPeriodicity effects Quality/EDCAccessReview section visibility
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

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any= {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'protocolPhasePid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Protocol Phase',
        helpText: 'Study phase I to IV',
        options: this.tblParamService.getParams(this.protocolPhaseParId),
        valueProp: 'recId',
        labelProp: 'description',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'protocolComplexityPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Protocol Complexity',
        helpText: 'Simple if phase IV or phase I , complex if oncology or transplant, normal otherwise',

        options: this.tblParamService.getParams(this.protocolComplexityParId),
        valueProp: 'recId',
        labelProp: 'description',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'rescueStudyPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Rescue Study',
        helpText: 'If study had DM started by another CRO, enter Y, otherwise N',
        options: this.tblParamService.getParams(this.rescueStudyParId),
        valueProp: 'recId',
        labelProp: 'description',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'totalUniqueForms',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Total Unique Forms',
        type: 'number',
        helpText:
          'Enter number of uniques planned per the initial contract ; if revised number during study, do NOT update this figure .',

        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'sdtmPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'SDTM',
        helpText: 'SDTM',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'externalDataSources',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'External Data Sources',
        type: 'number',
        helpText:
          'Enter number of external sources planned per the initial contract ; if revised number during study, do NOT update this figure .',

        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'unblindingactivitiesduringstudyPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Unblinding Activities During Study',
        helpText: 'If specific data unblinding the study can be transferred to DM , enter Y , otherwise enter N',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'sites',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sites',
        type: 'number',
        helpText:
          'Enter # sites from contract assumptions (source = GPT) ;  at each new change order approved, update the # of sites if applicable.',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'tmfPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'TMF',
        helpText: 'Enter the type of TMF',

        options: this.tblParamService.getParams(this.tmfParID),
        valueProp: 'recId',
        labelProp: 'description',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'tmfqcperiodicity',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'TMF QC Periodicity',
        description: 'in months',
        options: [
          { label: ' 0', value: 0 },
          { label: ' 1', value: 1 },
          { label: ' 2', value: 2 },
          { label: ' 3', value: 3 },
          { label: ' 4', value: 4 },
          { label: ' 5', value: 5 },
          { label: ' 6', value: 6 },
          { label: ' 7', value: 7 },
          { label: ' 8', value: 8 },
          { label: ' 9', value: 9 },
          { label: '10', value: 10 },
          { label: '11', value: 11 },
          { label: '12', value: 12 }
        ],

        helpText:
          'Specify how often (in months) the TMF should be QCed , for example if quarterly , enter 3 ; if regular TMF QC not applicable, enter 0',

        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-2'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'tmfqcperiodicityComment',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'TMF QC Periodicity Comment',
        rows: 5,
        maxLength: 200,
        description: 'Max 200 characters.',
        placeholder: 'TMF QC Periodicity Comment',
        helpText: 'If regular TMF QC not applicable, enter a justification.',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      }
    },
    {
      key: 'auditTrailReviewId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Audit Trail Review',
        // helpText: '',
        options: this.tblParamService.getParams(this.yesNoNaParId),
        valueProp: 'recId',
        labelProp: 'description',
        // required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'auditTrailPeriodicity',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Audit Trail Periodicity',
        description: 'in months',
        options: [
          { label: ' 0', value: 0 },
          { label: ' 1', value: 1 },
          { label: ' 2', value: 2 },
          { label: ' 3', value: 3 },
          { label: ' 4', value: 4 },
          { label: ' 5', value: 5 },
          { label: ' 6', value: 6 },
          { label: ' 7', value: 7 },
          { label: ' 8', value: 8 },
          { label: ' 9', value: 9 },
          { label: '10', value: 10 },
          { label: '11', value: 11 },
          { label: '12', value: 12 }
        ],

        helpText:
          'Specify how often (in months) the EDC Access Review Periodicity, for example if quarterly , enter 3 ; if regular ECD Access not applicable, enter 0',

        // required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-2'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'edcaccessReviewPeriodicity',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'EDC Access Review Periodicity',
        description: 'in months',
        options: [
          { label: ' 0', value: 0 },
          { label: ' 1', value: 1 },
          { label: ' 2', value: 2 },
          { label: ' 3', value: 3 },
          { label: ' 4', value: 4 },
          { label: ' 5', value: 5 },
          { label: ' 6', value: 6 },
          { label: ' 7', value: 7 },
          { label: ' 8', value: 8 },
          { label: ' 9', value: 9 },
          { label: '10', value: 10 },
          { label: '11', value: 11 },
          { label: '12', value: 12 }
        ],

        helpText:
          'Specify how often (in months) the EDC Access Review Periodicity, for example if quarterly , enter 3 ; if regular ECD Access not applicable, enter 0',

        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-2'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'sFtpAccessReviewPeriodicity',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'sFTP Access Review Periodicity',
        description: 'in months',
        options: [
          { label: ' 0', value: 0 },
          { label: ' 1', value: 1 },
          { label: ' 2', value: 2 },
          { label: ' 3', value: 3 },
          { label: ' 4', value: 4 },
          { label: ' 5', value: 5 },
          { label: ' 6', value: 6 },
          { label: ' 7', value: 7 },
          { label: ' 8', value: 8 },
          { label: ' 9', value: 9 },
          { label: '10', value: 10 },
          { label: '11', value: 11 },
          { label: '12', value: 12 }
        ],

        helpText:
          'Specify how often (in months) the SFTP Access Review Periodicity, for example if quarterly , enter 3 ; if regular ECD Access not applicable, enter 0',

         required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-2'
      },
      validation: {
        show: true
      }
    }
  ];

  submit() {
    if (this.form.valid) {
      this.saveStudyAssumptions();
    }
  }

  ngOnDestroy() {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
