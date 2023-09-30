import { Component, OnInit, OnDestroy , Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, of, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { crmProjectGovernanceService } from '../crm-project-governance.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblCrmParamService } from '@app/prism/masters/TblCrmParam/TblCrmParam.service';


@Component({
  selector: 'app-crm-proj-gov-edit',
  templateUrl: './crm-proj-gov-edit.component.html',
  styleUrls: ['./crm-proj-gov-edit.component.css']
})
export class CrmProjGovEditComponent implements OnInit, OnDestroy {
  
  
  studyId : number = 0;
  groupId : number = 0;

  @Output() isFormDirty = new EventEmitter<any>();
  reviewId: number = 0;

  form = new FormGroup({});
  loading: boolean = false;
  // studyId: number = 0;

  review: any;
  StatusParId = 1300;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  markAsReviewSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;

  private dirty = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private studyEditService: StudyEditService,
    private crmProjectGovernanceSer: crmProjectGovernanceService,
    private tblParamService: TblParamService,
    private tblCrmParamService: TblCrmParamService
  ) {}

  ngOnInit(): void {

   
    this.groupId = this.route.snapshot.data['groupId'] || 0;
    
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyId = st.studyId;
      const studyType = st?.studyType;
      if (studyType === 'CRM' || studyType === 'DM+CRM') {
        if (this.studyId > 0 && this.groupId > 0){
          this.loaddata(this.studyId, this.groupId);
        }
        
      }
    });

    
    // this.form.valueChanges.subscribe(() => {
    //   if (!this.dirty && this.form.dirty) {
    //     this.dirty = true;
    //     this.emitFormDirty();
    //   } else if (this.dirty && !this.form.dirty) {
    //     this.dirty = false;
    //     this.emitFormDirty();
    //   }
    // });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['studyId']) {
  //     this.loaddata(this.studyId, this.groupId);
  //   }
  // }

  // private emitFormDirty() {
  //   this.isFormDirty.emit(this.dirty);
  // }

  canReview() {
    return this.groupId === 2 || this.groupId === 3;
  }

  


  loaddata(studyId: number, groupId : number) {
    this.loading = true;
    this.loadSubscription = this.crmProjectGovernanceSer.getCrmProjGovCurrentReview(studyId, groupId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          
        } else {
          this.review = res;
          this.reviewId = this.review?.recId;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  get updatedOn(){
    if (this.review){
      return this.review[0]?.updatedOn;
    }
    return '';
  }

  

  submit() {
    if (this.form.valid) {
      this.saveData();
    }
  }

  saveData() {
    this.loading = true;
    this.saveSubscription = this.crmProjectGovernanceSer.saveData(this.review).subscribe(
      (res: any) => {
        this.review = res;
        this.form.reset();
        this.loading = false;
         this.loaddata(this.studyId, this.groupId);
      },
      (err: any) => {
        console.log(`error while editing = ${err}`);
      }
    );
  }

  markAsReviwed() {
    this.markAsReviewSubscription = this.crmProjectGovernanceSer.markAsReviewed(this.review).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.review = res;
          this.form.reset();
          this.loading = false;
          this.loaddata(this.studyId, this.groupId);
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  model: any = {};
  options: FormlyFormOptions | any = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row bg-green',
      fieldGroup: [
        {
          className: 'col-4',
          template: '<label >Tasks</label>'
        },
        {
          className: 'col-2',
          template: '<label >Status</label>'
        },
        {
          className: 'col-2',
          template: '<label >Things to Consider (500 chars max)</label>'
        },
        {
          className: 'col-2',
          template: '<label >CRM Comments (500 chars max)</label>'
        },
        {
          className: 'col-2',
          template: '<label >CRM/CDA Action (500 chars max)</label>'
        }
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
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            key: 'fieldDescription',
            type: 'label'
          },
          
          {
            className: 'col-2',
            key: 'statusId',
            type: 'ng-select',
            wrappers: ['help-text'],
            templateOptions: {
              // label: 'Activity',
              options: this.tblCrmParamService.getParams(this.StatusParId),
              valueProp: 'recId',
              labelProp: 'description',
              // required: true,
              helpText: '',
              labelColClassName: 'col-4',
              fieldColClassName: 'col-6'
            },
            validation: {
              // show: true
            }
          },
          {
            type: 'textarea',
            key: 'description',
            wrappers: ['help-text'],
            className: 'col-2',
            templateOptions: {
              maxLength: 500
            }
            
          },

          {
            type: 'textarea',
            key: 'comment',
            wrappers: ['help-text'],
            className: 'col-2',
            templateOptions: {
              maxLength: 500
            }
          },
          {
            type: 'textarea',
            key: 'actions',
            wrappers: ['help-text'],
            className: 'col-2',
            templateOptions: {
              maxLength: 500
            }
          }
        ]
      }
    }
  ];

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message =
        "There are unsaved changes in the CRM Project Grovernance Form.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
    this.markAsReviewSubscription?.unsubscribe();
  }
}
