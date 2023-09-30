import { style } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
// import { time } from 'console';
// import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-study-page-flow',
  templateUrl: './study-page-flow.component.html',
  styleUrls: ['./study-page-flow.component.css']
})
export class StudyPageFlowComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  pageflow: any;
  actualPageSum: number = 0;
  futurepageSum: number = 0;
  selectedYear: any;
  filterPageFlow: any;
  currentYear: number | undefined;
  firstStudyDate: any;
  lastStudyDate: any;
  lastSavedOn: any;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;

  hasDMManagerRole: boolean = false;

  constructor(
    public router: Router,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService,
    private modalService: NgbModal
  ) {}
  tableForm = new FormGroup({
    selectedYear: new FormControl()
  });
  ngOnInit(): void {
    var now = new Date();
    this.currentYear = now.getFullYear();
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    //   if (this.studyId > 0) {
    //     this.loadStudyPageFlow(this.studyId);
    //   }
    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadStudyPageFlow(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadStudyPageFlow(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyPageflowDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.setPageFlow(res);
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  setPageFlow(res: any) {
    this.pageflow = { pageflow: res.pageFlowItems };
    this.firstStudyDate = res.firstDate;
    this.lastStudyDate = res.lastDate;
    this.lastSavedOn = res.lastSavedOn;
    this.setDefaultYear();
    this.filterRecords();
  }

  get totalActualPages(): number {
    if (this.pageflow == null) {
      return 0;
    }
    return this.pageflow.pageflow.reduce(function(prev: number, cur: any) {
      return prev + +cur.actualPages;
    }, 0);
  }

  get totalFuturePages(): number {
    if (this.pageflow == null) {
      return 0;
    }

    return (
      this.pageflow.pageflow
        // .filter((x: any) => x.actualPages === null || x.actualPages == '' || +x.actualPages == 0)
        // .reduce(function(prev: number, cur: any) {
        //   return prev + +cur.plannedPages;
        // }, 0);
        .filter((x: any) => x.isFuture==true)
        .reduce(function(prev: number, cur: any) {
          return prev + +cur.plannedPages;
        }, 0)
    );
  }

  get YearValue(): any {
    if (this.pageflow == null) {
      return;
    }
    return [...new Set(this.pageflow.pageflow.map((rec: any) => new Date(rec.yyyymm).getFullYear()))].sort();
  }

  saveStudyPageFlow() {
    this.loading = true;
    this.saveSubscription = this.studyReviewService.saveStudyPageflow(this.studyId, this.pageflow.pageflow).subscribe(
      res => {
        this.form.reset();
        this.setPageFlow(res);
        this.loading = false;
        console.log(`success`);
      },
      err => {
        console.log(`error while editing = ${err}`);
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Pageflow.  Click 'Ok' to continue without saving. ";
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

  options: FormlyFormOptions | any = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row bg-green',
      fieldGroup: [
        { className: 'col-sm-3', template: '<label class="form-label">MMM-YYYY <label class="form-label">' },
        { className: 'col-sm-3', template: '<label class="form-label">Planned Pages<label class="form-label">' },
        { className: 'col-sm-3', template: '<label class="form-label">Actual Pages<label class="form-label">' }
      ]
    },
    {
      key: '',
      type: 'repeat',
      templateOptions: {
        hideRemoveButton: true,
        hideAddButton: true
      },
      fieldArray: {
        fieldGroupClassName: 'row alt-row-form',
        fieldGroup: [
          {
            className: 'col-sm-3',
            type: 'label',
            key: 'yyyymm',
            templateOptions: {
              pipe: 'date',
              pipeFormat: 'MMM-yyyy'
            }
          },
          {
            type: 'input',
            key: 'plannedPages',
            className: 'col-sm-3 mb-4',
            wrappers: ['help-text'],
            templateOptions: {
              helpText: 'Enter the number of pages expected to be entered in the month, INCLUDING diary/QOL pages',
              type: 'number'
            }
          },
          {
            type: 'input',
            key: 'actualPages',
            className: 'col-sm-3 mb-3',
            wrappers: ['help-text'],
            templateOptions: {
              helpText: 'Enter the actual number of pages entered in the month, INCLUDING diary/QOL pages',
              type: 'number'
            },
            //IsFuture
            expressionProperties: {
              'templateOptions.disabled': x => x.isFuture
            }
          }
        ]
      }
    }
  ];

  updateYear(e: any) {
    this.selectedYear = e.target.value;
    this.filterRecords();
  }
  //list.sort((a, b) => (a.color > b.color) ? 1 : -1)
  filterRecords() {
    this.filterPageFlow = this.pageflow.pageflow
      .filter((x: any) => new Date(x.yyyymm).getFullYear() == this.selectedYear)
      .sort((a: any, b: any) => (a.yyyymm > b.yyyymm ? 1 : -1));
    return this.filterPageFlow;
  }

  setDefaultYear() {
    this.YearValue.forEach((x: any) => {
      let maxYear = Math.max.apply(null, this.YearValue);
      if (x == this.currentYear) {
        this.selectedYear = this.currentYear;
      } else {
        this.selectedYear = maxYear;
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.saveStudyPageFlow();
    }
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
