import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblCrmParamService } from '@app/prism/masters/TblCrmParam/TblCrmParam.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
// import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';
import { CrmAnalysisPlanningEditService } from '@app/prism/crm/crm-tabs/crm-analysis-planning.service';
//for user
import { UserRoles } from '@app/core/authentication/credentials.enums';

//Surekha:
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import * as CrmData from './crm-data.json';
//Prism\ClientApp\src\app\prism\crm\crm-tabs\crm-data.json
import { CrmPopoverComponent } from './crm-popover.component';

@Component({
  selector: 'app-crm-study-analysis-planning',
  templateUrl: './crm-study-analysis-planning.component.html',
  styleUrls: ['./crm-study-analysis-planning.component.css']
})
export class CrmStudyAnalysisPlanningComponent implements OnInit {
  // Surekha:
  Object = Object;
  // crmDatas: any = [];

  studyId: number = 0;
  record: any = {};
  study: any = {};

  selectedYear: any;
  pageFlowData: any;
  filterPageFlow: any;
  currentYear: number | undefined;

  firstStudyDate: any;
  lastStudyDate: any;
  lastSavedOn: any;
  AnalysisParId = 1100;
  pageflow: any;

  activityParId = 100;
  centralMonitoringStatusParId = 200;
  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;

  form: any = new FormGroup({});

  constructor(
    public router: Router,

    private studyEditService: StudyEditService,
    private crmAnalysisPlanningEditService: CrmAnalysisPlanningEditService,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private tblCrmParamService: TblCrmParamService,
    // private cd: ChangeDetect
    //Surekha:
    private ngbModal: NgbModal
  ) { }

  ngOnInit(): void {
    var now = new Date();
    this.currentYear = now.getFullYear();
    //cds is common for DM and IMI Studies:
    this.studyEditService.setDashboard('crm');
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    //   if (this.studyId > 0) {
    //     this.loadRecord(this.studyId);
    //   }

    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyId = st.studyId;
      const studyType = st?.studyType;
      if (studyType === 'CRM' || studyType === 'DM+CRM') {
        this.loadRecord(this.studyId);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe((value: any) => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  ngAfterViewInit(): void {
    this.form.get('firstAnalysisDate')?.valueChanges.subscribe((firstAnalysisDate: any) => {
      this.onChangeDates();
    });

    this.form.get('finalAnalysisDate')?.valueChanges.subscribe((finalAnalysisDate: any) => {
      this.onChangeDates();
    });
  }

  onChangeDates() {
    console.log(`on change dates = ${this.record.firstAnalysisDate}, ${this.record.finalAnalysisDate}`);
    if (this.record.firstAnalysisDate && this.record.finalAnalysisDate) {
      console.log(`on change dates = ${this.record.firstAnalysisDate}, ${this.record.finalAnalysisDate}`);
      this.getAnaysisTableRecords(this.studyId, this.record.firstAnalysisDate, this.record.finalAnalysisDate);
    }
  }

  loadRecord(studyId: number) {
    console.log(`load record`);
    this.loading = true;
    this.loadSubscription = this.crmAnalysisPlanningEditService.getRecordForEdit(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
        // if (res.status === 400) {
        //   this.loading = false;
        //   return;
        // } else {
        this.record = res;
        // this.crmDatas = res.analysisPlanningFlowDTOs;
        this.pageFlowData = res.analysisPlanningFlowDTOs;
        this.filterPageFlow = res.analysisPlanningFlowDTOs;
        // this.setPageFlow(this.filterPageFlow);
        //this.setPageFlow(res[0]);
        // if (this.record.recId!='undefined')
        //   this.loadRecordForFlow(this.record.recId);


        // this.form.reset();
        this.loading = false;
        // }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  getAnaysisTableRecords(studyId: number, firstAnalysisDate: any, finalAnalysisDate: any) {
    this.crmAnalysisPlanningEditService
      .getAnaysisTableRecords(studyId, this.record.recId, firstAnalysisDate, finalAnalysisDate)
      .subscribe((res: any) => {
        // console.log(`pageFlowData = ${JSON.stringify(res, null, 2)}`);
        this.pageFlowData = res;
        this.calculateTotalActualAndForecast();
        // this.form.reset();
      });
  }

  calculateTotalActualAndForecast() {
    console.log(`calculateTotalActualAndForecast`);
    // console.log(`pageflowdata flat = ${JSON.stringify( this.pageFlowData.map((x: any) => x.months))}`);

    // let actualSum: number = this.pageFlowData.map((x: any) => x.months).flat().filter((x: any) => x.actual != null).reduce((accumulator: number, object: any) => {
    //   return accumulator + parseInt(object["actual"]);
    // }, 0);

    let actualSum: number = this.pageFlowData.reduce((sum: number, yearData: any) => {
      return sum + yearData.months.reduce((monthSum: number, monthData: any) => {
        // Check if the "actual" property is not null
        if (monthData.actual !== null) {
          // Convert the "actual" property to a number and add it to the monthSum
          return monthSum + Number(monthData.actual);
        }
        return monthSum; // If "actual" is null, return the current monthSum
      }, 0); // Initialize monthSum to 0
    }, 0);

    // let forecastSum = this.pageFlowData.map((x: any) => x.months).filter((x: any) => x.foreCast != null).reduce((accumulator: number, object: any) => {
    //   return accumulator + parseInt(object["foreCast"]);
    // }, 0);

    let forecastSum = this.pageFlowData.reduce((sum: number, yearData: any) => {
      return sum + yearData.months.reduce((monthSum: number, monthData: any) => {
        // Check if the "actual" property is not null
        if (monthData.foreCast !== null) {
          // Convert the "actual" property to a number and add it to the monthSum
          return monthSum + Number(monthData.foreCast);
        }
        return monthSum; // If "actual" is null, return the current monthSum
      }, 0); // Initialize monthSum to 0
    }, 0)

    this.record.totalActualCdaAnalysis = actualSum;
    this.record.totalScheduleCdaAnalysis = forecastSum;

    // this.record.totalActualCdaAnalysis = 0;

    let totalActualCdaAnalysisField: any = this.fields.find((f) => f.key == 'totalActualCdaAnalysis');
    totalActualCdaAnalysisField.templateOptions.disabled = false; // Enable the field
    this.record.totalActualCdaAnalysis = actualSum; // Set the value
    totalActualCdaAnalysisField.templateOptions.disabled = true; // Disable the field again

    console.log(`actualsum = ${actualSum}`);
    console.log(`forecastSum = ${forecastSum}`);
    // // this.form.get("totalActualCdaAnalysis").enable();
    // // this.form.get("totalActualCdaAnalysis").setValue(actualSum);
    // this.form.controls['totalActualCdaAnalysis'].setValue(actualSum);
    // this.form.patchValue({
    //   totalActualCdaAnalysis: actualSum
    // });
    // // this.form.reset();
    // // this.form.get("totalActualCdaAnalysis").disable();

    let totalScheduleCdaAnalysisField: any = this.fields.find((f) => f.key == 'totalScheduleCdaAnalysis');
    totalScheduleCdaAnalysisField.templateOptions.disabled = false; // Enable the field
    this.record.totalScheduleCdaAnalysis = forecastSum; // Set the value
    totalScheduleCdaAnalysisField.templateOptions.disabled = true; // Disable the field again

    // // this.form.get("totalScheduleCdaAnalysis").enable();
    // this.form.get("totalScheduleCdaAnalysis").setValue(forecastSum);
    // this.form.patchValue({
    //   totalScheduleCdaAnalysis: forecastSum
    // });
    // this.form.get("totalScheduleCdaAnalysis").disable();

    // console.log(`this.form.get("totalScheduleCdaAnalysis") = ${this.form.get("totalScheduleCdaAnalysis").value}`);
    this.fields = [...this.fields];
    this.options.updateInitialValue()

  }

  // loadRecordForFlow(TaskId: number) {
  //   this.loading = true;
  //   this.loadSubscription = this.crmAnalysisPlanningEditService.getRecordForEditFlow(TaskId).subscribe(
  //     (res: any) => {
  //       // if (res.status === 400) {
  //       //   this.loading = false;
  //       //   return;
  //       // } else {
  //         console.log('flow');
  //         console.log(res);
  //         this.filterPageFlow = res;
  //         this.setPageFlow(this.filterPageFlow);

  //        // this.form.reset();
  //         this.loading = false;
  //       // }
  //     },
  //     (err: any) => {
  //       console.log(`err = ${JSON.stringify(err, null, 2)}`);
  //       this.loading = false;
  //     }
  //   );
  // }

  saveRecord() {
    this.loading = true;
    this.record.analysisPlanningFlowDTOs = this.pageFlowData;
    // console.log("saveRecord");
    if(this.record.firstAnalysisDate==null || this.record.finalAnalysisDate== null){
      this.record.totalScheduleCdaAnalysis=0;
      this.record.totalActualCdaAnalysis=0;
      this.record.analysisPlanningFlowDTOs=[];
    }
    console.log(JSON.stringify(this.record, null, 2));

    this.saveSubscription = this.crmAnalysisPlanningEditService.update(this.studyId, this.record).subscribe(
      res => {
        console.log("saved successfully");
        console.log(res);
        //this.record = res;
        // this.form.reset();
        //this.loading = false;

        // this.saveFlowRecords();
        this.form.reset();
        this.studyEditService.setStudyId(this.studyId);
        this.loadRecord(this.studyId);

      },
      err => {
        console.log(err);
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }

  // saveFlowRecords() {
  //   var flowReq = {
  //     analysisPlanningId: this.record.recId,
  //     flowRecords: this.pageFlowData,
  //     studyId: this.studyId,
  //     firstAnalysisDate: this.record.firstAnalysisDate,
  //     finalAnalysisDate: this.record.finalAnalysisDate,
  //     TotalScheduleCdaAnalysis:this.record.TotalScheduleCdaAnalysis,
  //     TotalActualCdaAnalysis:this.record.TotalActualCdaAnalysis
  //   };
  //   // console.log(`flow req = ${JSON.stringify(flowReq, null, 2)}`);
  //   this.crmAnalysisPlanningEditService.updateFlowRecords(flowReq).subscribe(
  //     res => {
  //       this.form.reset();
  //       this.loadRecord(this.studyId);
  //       this.studyEditService.setStudyId(this.studyId);

  //       // this.studyEditService.loadStudyProperties();
  //       // this.getAnaysisTableRecords(this.studyId, this.record.firstAnalysisDate, this.record.finalAnalysisDate);

  //       this.loading = false;
  //     },
  //     err => {
  //       // console.log(err);
  //       console.log(`error while saving = ${JSON.stringify(err)}`);
  //       this.loading = false;
  //     }
  //   );
  // }

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

  tableForm = new FormGroup({
    selectedYear: new FormControl()
  });

  // setPageFlow(res: any) {
  //   this.pageflow = res;
  //   console.log(`setPageFlow = ${JSON.stringify(this.pageflow, null, 2)}`);
  //   this.firstStudyDate = this.record.firstAnalysisDate;
  //   this.lastStudyDate = this.record.finalAnalysisDate;
  //   this.lastSavedOn = this.record.updatedOn;
  //   this.setDefaultYear();
  //   this.filterRecords();
  // }

  // filterRecords() {
  //   this.filterPageFlow = this.pageflow
  //     .filter((x: any) => new Date(x.monthYear).getFullYear() == this.selectedYear)
  //     .sort((a: any, b: any) => (a.monthYear > b.monthYear ? 1 : -1));
  //   // console.log(`filter pageflow = ${JSON.stringify(this.filterPageFlow, null, 2)}`);
  //   return this.filterPageFlow;
  // }

  get YearValue(): any {
    if (this.pageflow == null) {
      return;
    }
    return [...new Set(this.pageflow.map((rec: any) => new Date(rec.monthYear).getFullYear()))].sort();
  }

  setDefaultYear() {
    // console.log(`year value = ${JSON.stringify(this.YearValue, null, 2)}`);
    this.YearValue?.forEach((x: any) => {
      let maxYear = Math.max.apply(null, this.YearValue);
      if (x == this.currentYear) {
        this.selectedYear = this.currentYear;
      } else {
        this.selectedYear = maxYear;
      }
    });
  }

  // updateYear(e: any) {
  //   this.selectedYear = e.target.value;
  //   this.filterRecords();
  // }

  submitFlow() {
    if (this.form.valid) {
      //this.saveFlowRecord();
      this.saveRecord();
    }
  }

  formclear() {
    this.form.reset();
  }

  // saveFlowRecord() {
  //   this.loading = true;
  //   this.saveSubscription = this.crmAnalysisPlanningEditService.updateFlow(this.studyId, this.filterPageFlow).subscribe(
  //     res => {
  //       console.log(res);
  //       //this.record = res;
  //       // this.form.reset();
  //       this.loading = false;
  //     },
  //     err => {
  //       console.log(err);
  //       console.log(`error while editing = ${err}`);
  //       this.loading = false;
  //     }
  //   );
  // }

  //Surekha:
  onClickActual(year: any, yearIndex: any, month: any, monthIndex: any, val: any) {
    if (val.foreCast != null && val.actual != null) {
      var modal = this.ngbModal.open(CrmPopoverComponent);
      modal.componentInstance.year = year;
      modal.componentInstance.month = month;
      modal.componentInstance.valObj = val;

      modal.result.then(
        result => {
          // console.log(`result = ${JSON.stringify(result)}`);
          // console.log(`year index = ${yearIndex} month index = ${ monthIndex }`);
          if (result) {
            this.pageFlowData[yearIndex].months[monthIndex] = result;
            // this.pageFlowData[yearIndex].months[monthIndex].actual = parseInt(result.actual);
            // this.pageFlowData[yearIndex].months[monthIndex].foreCast = parseInt(result.foreCast);
            console.log(`pageFlowdata = ${JSON.stringify(this.pageFlowData, null, 2)}`);

            // this.record.totalScheduleCdaAnalysis = this.pageFlowData.map((x: any) => x.months).reduce((accumulator: any, object: any) => {
            //   return accumulator + parseInt(object["foreCast"]);
            // }, 0);

            this.record.totalScheduleCdaAnalysis = this.CalculatetheTotalForcast(this.pageFlowData);

            console.log("Forcast:" + parseInt(this.record.totalScheduleCdaAnalysis));

            // this.record.totalActualCdaAnalysis = this.pageFlowData.map((x: any) => x.months).reduce((accumulator: any, object: any) => {
            //   return accumulator + parseInt(object["actual"]);
            // }, 0);

            this.record.totalActualCdaAnalysis = this.CalculatetheTotalActual(this.pageFlowData);

            console.log("Actual:" + parseInt(this.record.totalActualCdaAnalysis));

            this.form.patchValue({
              totalActualCdaAnalysis: this.record.totalActualCdaAnalysis,
              totalScheduleCdaAnalysis: this.record.totalScheduleCdaAnalysis
            })
            // this.form.reset();
            // this.crmDatas = this.crmDatas;
          }
        },
        err => { }
      );
    }else if(val.foreCast == null || val.actual == null){
      this.form.patchValue({
        totalActualCdaAnalysis: 0,
        totalScheduleCdaAnalysis: 0
      })
    }
  }

  CalculatetheTotalForcast(forcast: any) {
    var total = 0;
    //console.log("CalculatetheTotalForcast");
    for (var i of forcast) {
      // console.log(i);
      for (var j of i["months"]) {
        if (j["foreCast"] != null) {
          // console.log(parseInt(j["foreCast"]))
          total = total + parseInt(j["foreCast"]);
        }
      }
    }
    return total;
  }
  CalculatetheTotalActual(actual: any) {
    var total = 0;
    console.log("CalculatetheTotalActual");
    for (var i of actual) {
      // console.log(i);
      for (var j of i["months"]) {
        if (j["actual"] != null) {
          // console.log(parseInt(j["foreCast"]))
          total = total + parseInt(j["actual"]);
        }
      }
    }
    //console.log("actual total:"+ total);
    return total;
  }

  getStyle(forecast: any, actual: any) {
    if (actual == null) {
      return {};
    } else if (actual == 0 && forecast == 0) {
      return {
        'background-color': 'orange',
        color: 'black'
      };
    } else if (actual > forecast) {
      return {
        'background-color': '#73d773',
        color: 'white'
      };
    } else if (actual < forecast) {
      return {
        'background-color': 'red',
        color: 'white'
      };
    } else if ((actual = forecast)) {
      return {
        'background-color': '#73d773',
        color: 'white'
      };
    } else {
      return {};
    }
    // } else if (actual == 0 || actual < forecast) {
    //   return {
    //     'background-color': 'orange',
    //     color: 'black'
    //   };
    // } else {
    //   return {
    //     'background-color': '#73d773',
    //     color: 'white'
    //   };
  }

  getStyleForForecast(forecast: any) {
    if (forecast != null) {
      return { 'background-color': '#b7eef9ad' };
    } else {
      return {};
    }
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }

  //-------------------------------------------------------------

  model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'iconNumber',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICON Study No.',
        description: 'Derived from CRM Study Award Form',
        disabled: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'activity',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Activity',
        options: this.tblCrmParamService.getParams(this.activityParId),
        valueProp: 'recId',
        labelProp: 'description',
        disabled: true,
        description: 'Derived from CRM description form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'centralMonitoringStatus',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Central Monitoring Status',
        options: this.tblCrmParamService.getParams(this.centralMonitoringStatusParId),
        valueProp: 'recId',
        labelProp: 'description',
        disabled: true,
        description: 'Derived from CRM description form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    // {
    //   key: 'cdaCm',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'CDA/CM',
    //     options: this.tblUserService.getUsersForcdacm(),
    //     valueProp: 'id',
    //     labelProp: 'value',
    //    // disabled: true,
    //     description: 'Derived from CRM description form',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    // },
    {
      key: 'cdaCmDescription',
      type: 'label',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDA/CM',
        hideLabel: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }

    },
    {
      key: 'firstAnalysisDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'First Analysis date',
        helpText: 'First Analysis date',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'finalAnalysisDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Final Analysis date',
        helpText: 'Final Analysis date',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'noOfCda',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Number of CDA analysis rounds for the study- Budget',
        disabled: true,
        description: 'Derived from CRM Budget form as per the latest budget entered',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'totalScheduleCdaAnalysis',
      type: 'input',
      wrappers: ['horizontal-layout'],

      templateOptions: {
        type: 'number',
        min: 0,
        label: 'Total Forecasted CDA Analysis ',
        description: 'Calucated field based on entry of forcasted units for each month',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        disabled: true
      }
    },
    {
      key: 'totalActualCdaAnalysis',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        type: 'number',
        min: 0,
        label: 'Total Actual CDA  Analysis',

        description: 'Calucated field based on entry of Actual analysis units for each month',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        disabled: true
      }
    }
  ];

  // formFlow = new FormGroup({});

  // optionsFlow: FormlyFormOptions | any = {};

  // fieldsFlow: FormlyFieldConfig[] = [
  //   {
  //     fieldGroupClassName: 'row bg-green',
  //     fieldGroup: [
  //       { className: 'col-sm-4', template: '<label>MMM-YYYY <label>' },
  //       { className: 'col-sm-4', template: '<label>Analysis<label>' },
  //       { className: 'col-sm-4', template: '<label>Comment<label>' }
  //     ]
  //   },
  //   {
  //     key: '',
  //     type: 'repeat',
  //     templateOptions: {
  //       hideRemoveButton: true,
  //       hideAddButton: true
  //     },
  //     fieldArray: {
  //       fieldGroupClassName: 'row alt-row-form',
  //       fieldGroup: [
  //         {
  //           className: 'col-sm-4',
  //           type: 'label',
  //           key: 'monthYear',
  //           templateOptions: {
  //             pipe: 'date',
  //             pipeFormat: 'MMM-yyyy'
  //           }
  //         },
  //         {
  //           type: 'ng-select',
  //           key: 'analysisCpId',
  //           className: 'col-sm-4 mb-4',
  //           wrappers: ['help-text'],
  //           templateOptions: {
  //             label: 'Analysis',
  //             options: this.tblCrmParamService.getParams(this.AnalysisParId),
  //             valueProp: 'recId',
  //             labelProp: 'description',
  //             required: true,
  //             helpText: '',
  //             labelColClassName: 'col-4',
  //             fieldColClassName: 'col-6'
  //           }
  //         },
  //         {
  //           key: 'comment',
  //           type: 'textarea',
  //           className: 'col-sm-4 mb-4',
  //           wrappers: ['help-text'],
  //           templateOptions: {
  //             label: 'Comments',
  //             rows: 3,
  //             helpText: '',
  //             labelColClassName: 'col-4',
  //             fieldColClassName: 'col-6'
  //           },
  //           //IsFuture
  //           expressionProperties: {
  //             'templateOptions.disabled': x => x.isFuture
  //           }
  //         }
  //       ]
  //     }
  //   }
  // ];
}
