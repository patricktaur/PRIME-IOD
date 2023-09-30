import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';
import { FormGroup, FormControl } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
//for user

//for user with filter dropdown values:
//import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { CdmsCppcService } from '@app/prism/study/study-tabs/study-cdms-group/cdms-cppc/cdms-cppc.service';
@Component({
  selector: 'app-cdms-cppc-edit',
  templateUrl: './cdms-cppc-edit.component.html',
  styleUrls: ['./cdms-cppc-edit.component.css']
})
export class CdmsCppcEditComponent extends StudyEditBase implements OnInit {
  title = 'CdmsCppc';
  override controllerName = 'TblStudyCdmsChildRecords';

  cppcNumberExists: boolean | undefined;
  cppcReasonParId = 3300;
  constructor(
    public override route: ActivatedRoute,
    public override router: Router,
    private tblParamService: TblParamService, //for user with filter dropdown values:
    private cdmsCppcService: CdmsCppcService //private tblParamService: TblParamService
  ) {
    super(route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.form.get('cppcNumberFromCppcrf').valueChanges.subscribe((value: any) => {
      // if (this.editMode == 'new') {
      //   this.loadProgrammingLead(value);
      // }
      this.CheckIfCPPCNumberExists();
    });
  }

  CheckIfCPPCNumberExists() {
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.cdmsCppcService
      .cppcNumberExists(this.record.studyId, this.record.cppcNumberFromCppcrf, this.record.recId)
      .subscribe(
        (res: any) => {
          this.cppcNumberExists = res;
        },
        (err: any) => {
          console.log(`err = ${JSON.stringify(err, null, 2)}`);
          this.loading = false;
        }
      );
  }

  //example overload:
  // addOrUpdate() {
  //   //code before update
  //   super.addOrUpdate();
  // }

  //todo:
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'cppcNumberFromCppcrf',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        type: 'number',
        label: 'CPPC Number (from CPPCRF)',

        required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },

      /*
asyncValidators: {
        uniqueUsername: {
          expression: (control: FormControl) => {
            return of(this.existingUsers.indexOf(control.value) === -1);
          },
          message: 'This username is already taken.',
        },
      },
      */
      // asyncValidators: {
      //   validation: [

      //     (control: FormControl) => this.cdmsCppcService.cppcNumberExists(control.value).pipe(
      //       map(isValid => isValid ? null : { valueExists: true }),
      //     ),

      //   ],

      // },

      // asyncValidators: {
      //   uniqueUsername: {
      //     expression: (control: FormControl) => {
      //     return of(this.cdmsCppcService.cppcNumberExists(control.value));
      //     },
      //     message: 'This username is already taken.',
      //   },
      // },
      validation: {
        show: true,
        message: 'abcd'
      }
    },

    {
      key: 'cppcReasonPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CPPC Reason',

        options: this.tblParamService.getParams(this.cppcReasonParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'editChecksCompletedCppc',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        type: 'number',
        label: 'Edit Checks Completd (CPPC)',

        required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'dateCppcCompleted',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Date CPPC Completed',
        required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    }
  ];
}
