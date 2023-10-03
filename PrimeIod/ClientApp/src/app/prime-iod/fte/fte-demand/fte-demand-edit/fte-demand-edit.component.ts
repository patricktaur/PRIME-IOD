
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';

import { FteDemandService } from '../fte-demand-service';


import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
// import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
// import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';


@Component({
  selector: 'app-fte-demand-edit',
  templateUrl: './fte-demand-edit.component.html',
  styleUrls: ['./fte-demand-edit.component.scss']
})
export class FteDemandEditComponent  implements OnInit, OnDestroy{
  
  loading = false;
  title = 'FteDemand';


  record: any;
  form = new FormGroup({});

  //  organizedData : any = {};
  //  public Object = Object;

  // formDet: FormGroup = new FormGroup({});
  

  id: number = 0;
  editMode: string = '';

  xxParId = 0;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription| undefined;
  addUpdateSub: Subscription| undefined;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    // private tblParamService: TblParamService,
    // private tblUserService: TblUserService,
    private xmodelService: FteDemandService ,
    private fb: FormBuilder
  ) 
  { }

  ngOnInit(): void {
   
    let id: any = this.route.snapshot.queryParamMap.get('id');
    this.id = +id;
    if (this.id > 0) {
      this.editMode = 'edit';
      this.loadRecord(this.id);
    } else {
      this.editMode = 'new';
      this.loadNewRecord();
    }
    
    // this.formDet = this.fb.group({
    //   years: this.fb.array([])
    // });
    
    
  }

  loadRecord(recId: number) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.xmodelService.getRecordToEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
          
          // this.organizeData();
          // this.initializeForm();
          
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  
  
  
  
  
  // organizeData() {
  //   for (let detail of this.record.tblFteDemandDetailDTO) {
  //     let date = new Date(detail.periodStarting);
  //     let year = date.getFullYear();
  //     let month = date.getMonth();

  //     if (!this.organizedData[year]) {
  //       this.organizedData[year] = {
  //         DemandFte: Array(12).fill(0),
  //         AssignedFte: Array(12).fill(0)
  //       };
  //     }

  //     this.organizedData[year].DemandFte[month] = detail.demandFte;
  //     this.organizedData[year].AssignedFte[month] = detail.assignedFte;
  //   }
  // }

  // get years(): FormArray {
  //   return this.formDet.get('years') as FormArray;
  // }

  // initializeForm() {
  //   const yearsSet = new Set(this.record.tblFteDemandDetailDTO.map((detail: any) => new Date(detail.periodStarting).getFullYear()));
  //   const years = Array.from(yearsSet);

  //   for (let year of years) {
  //     const yearGroup = this.fb.group({
  //       year,
  //       months: this.fb.array([])
  //     });
  //     const monthsArray = yearGroup.get('months') as FormArray;

  //     const detailsForYear = this.record.tblFteDemandDetailDTO.filter((detail: any) => new Date(detail.periodStarting).getFullYear() === year);

  //     for (let detail of detailsForYear) {
  //       monthsArray.push(this.fb.group({
  //         demandFte: [detail.demandFte],
  //         actualFte: [detail.actualFte]
  //       }));
  //     }

  //     this.years.push(yearGroup);
  //   }
  // }

  loadNewRecord() {
    this.loading = true;
    this.loadNewRecordSub = this.xmodelService.getNew().subscribe(
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

  

  addOrUpdate() {
    this.loading = true;

    this.addUpdateSub = this.xmodelService.addOrUpdate(this.record).subscribe(
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
  cancel() {
    this.location.back();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes.  Click 'Ok' to continue without saving. ";
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
      this.addOrUpdate();
    }
  }

  back() {
    this.location.back();
  }
  //todo:
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    // {
    //   key: 'xxx',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Drop down - Param',
    //     helpText: 'Help ...',
    //     options: this.tblParamService.getParams(this.xxParId),
    //     valueProp: 'recId',
    //     labelProp: 'description',

    //     placeholder: '-Select-',
    //     required: true,
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // },
    // {
    //   key: 'xx-userId',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Drop down user list',

    //     options: this.tblUserService.getUsers(),

    //     valueProp: 'id',
    //     labelProp: 'value',
    //     required: true,
    //     helpText: '',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // },

    {
      key: 'startDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Start On',
        helpText: 'Help ...',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'endDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Stop On',
        helpText: 'Help ...',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    
    {
      key: 'demandFte',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Demand',
        type: 'number',
        // helpText: 'Help ...',
        
        
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'assignedFte',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Assigned',
        type: 'number',
        // helpText: 'Help ...',
        
        
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'actualFte',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Actual',
        type: 'number',
        // helpText: 'Help ...',
        
        
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    
    {
      key: 'tblFteDemandDetailDTO',
      type: 'repeat-horizontal',
      templateOptions: {
        hideRemoveButton: true,
        hideAddButton: true
      },
      fieldArray: {
        fieldGroupClassName: 'row alt-row-form',
        fieldGroup: [
          {
            // className: 'col-4',
            type: 'label',
            key: 'periodStarting',
            templateOptions: {
              hideLabel: true
            }
          },
          {
            type: 'input',
            key: 'demandFte',
            // className: 'col-4',
            wrappers: ['help-text'],
            templateOptions: {
              helpText: 'Enter the order Number',
              type: 'number'
            }
          },
          // {
          //   type: 'input',
          //   key: 'assignedFte',
          //   className: 'col-4',
          //   wrappers: ['help-text'],
          //   templateOptions: {
          //     type: 'number'
          //   }
          // },
          
        ]
      }
    }

  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
  }
}
