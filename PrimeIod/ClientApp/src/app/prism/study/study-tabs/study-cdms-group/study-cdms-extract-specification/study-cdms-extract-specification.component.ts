import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsService } from '@app/core';
import { Observable, of, Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyCdmsService } from '../study-cdms.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { StudyTabsService } from '../../study-tabs.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TblParamExtendedExtendedService } from '@app/prism/masters/tbl-param-extended/tbl-param-extended.service';

@Component({
  selector: 'app-study-cdms-extract-specification',
  templateUrl: './study-cdms-extract-specification.component.html',
  styleUrls: ['./study-cdms-extract-specification.component.css']
})
export class StudyCdmsExtractSpecificationComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  studyId: number = 0;
  record: any = {};
  study: any = {};

  yesNoParId = 600;
  cdmsRoleId = 203;
  cdmsVersionParId = 2100;
  rolesPermissionsParId = 650;
  fileFormatParId = 9650;
  zipFileTargetParId = 9750;

  extractScopeParId = 200;
  booleanFormattingParId = 750;
  itemDisplayLabelParId = 800;
  viewTypeParId = 250;
  characterSetParId = 300;
  exportListParId = 350;
  formsQualityParId = 400;
  exportOrientationParId = 450;
  dataParId = 500;
  sasNamingModeParId = 550;
  patientIdAnonymizationParId = 600;
  sasLibraryNameParId = 700;

  customExportListRecId = 0;
  specificFormsRecId = 0;
  timelineValidation: any = {};
  updateTimelines: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  checkTimelineValSub: Subscription | undefined;
  getRaveVeevaIconOwnedValueSub: Subscription | undefined;


  constructor(
    public router: Router,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService,
    private studyTabService: StudyTabsService,
    private tblParamService: TblParamService,
    private tblParamExtendedService: TblParamExtendedExtendedService,
    private tblUserService: TblUserService,
    private studyCdmsService: StudyCdmsService
  ) {
    this.getcustomRecId();
    this.getSpecificFormsRecId();
  }

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      // console.log(`st = ${JSON.stringify(st, null, 2)}`);
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadRecord(this.studyId);

      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe((value: any) => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyCdmsExtractSpecificationDTO(studyId).subscribe(
      (res: any) => {
        // console.log(`res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          setTimeout(() => {
            this.setupValueChanges();
          }, 0);

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

  setupValueChanges() {
    // if (this.record?.isRave == true) {
    //   this.form.get('cdmsUrl').valueChanges.subscribe((value: any) => {
    //     this.setRaveIconOwnedValue(value);
    //   });
    // }

    // if (this.record?.isVeevaCdms == true) {
    //   this.form.get('cdmsUrlVeeva').valueChanges.subscribe((value: any) => {
    //     this.setVeevaCdmsIconOwnedValue(value);
    //   });
    // }
  }

  // setRaveIconOwnedValue(cdmsUrl: string) {
  //   this.getRaveVeevaIconOwnedValueSub = this.studyCdmsService.getRaveIconOwned(cdmsUrl).subscribe((res: any) => {
  //     this.form.get('sponsorUrl').setValue(!res);
  //   });
  // }

  // setVeevaCdmsIconOwnedValue(cdmsUrl: string) {
  //   this.getRaveVeevaIconOwnedValueSub = this.studyCdmsService.getVeevaVaultIconOwned(cdmsUrl).subscribe((res: any) => {
  //     this.form.get('sponsorUrl').setValue(!res);
  //   });
  // }

  saveRecord() {
    this.loading = true;
    this.record['studyId'] = this.studyId;
    this.saveSubscription = this.studyTabService.saveStudyCdmsExtractSpecification(this.studyId, this.record).subscribe(
      (res: any) => {
        this.record = res;
        this.form.reset();
        this.loading = false;
      },
      (err: any) => {
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in CDMS.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of
        (confirmation);
    } else {
      return of(true);
    }
  }

  get cdsmLeadNameAndCoveringCdmsLeadNameAreIdentical() {
    return this.record?.cdmsLeadNameId > 0 && this.record?.cdmsLeadNameId == this.record?.secondCdmsLeadNameId
      ? true
      : false;
  }

  get requireTimeLineUpdate() {
    return true;
  }

  getcustomRecId() {
    this.tblParamExtendedService.getParams(this.exportListParId)
      .subscribe((res: any) => {
        let customExportListRecId = res.find((x: any) => x.description == 'Custom')?.recId;
        this.customExportListRecId = customExportListRecId;
      })
  }

  getSpecificFormsRecId() {
    this.tblParamExtendedService.getParams(this.formsQualityParId)
      .subscribe((res: any) => {
        let specificFormsRecId = res.find((x: any) => x.description == 'Specific Forms')?.recId;
        // console.log(`customExportListRecId = ${this.customExportListRecId}`);
        this.specificFormsRecId = specificFormsRecId;
      })
  }

  submit() {
    if (this.form.valid) {
      this.saveRecord();
    }
  }

  form: FormGroup | any = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      //1
      key: 'cdmsleadNameId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS Lead Name',
        //required: true,
        disabled:true,
        options: this.tblUserService.getUserByrole(this.cdmsRoleId),
        //  .getUserByrole(this.requestorRoleParId),
        valueProp: 'id',
        labelProp: 'value',
        helpText: 'Select the name of the Lead CDMS.',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },
    {
      //2
      key: 'coveringCdmsleadNameId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Covering CDMS Lead Name',
        disabled:true,
        options: this.tblUserService.getUserByrole(this.cdmsRoleId),
        // .getUserByrole(this.requestorRoleParId),
        valueProp: 'id',
        labelProp: 'value',
        helpText: 'Select the name of the second Lead CDMS.',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'cdmsUrlText', //??
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS URL (only required for Rave and Veeva CDMS)',
        disabled:true,
        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      hideExpression: 'model?.isRaveOrCdms',
      validation: {
        show: true
      }
    },
    // drop down for cdmsUrl:
    {
      key: 'cdmsUrl', //??
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS URL (only required for Rave and Veeva CDMS)',
        disabled:true,
        options: this.studyCdmsService.getRaveUrls(),
        valueProp: "id",
        labelProp: "value",
        placeholder: '-Select from Rave Urls-',
        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      hideExpression: '!model?.isRave',
      validation: {
        show: true
      }
    },
    {
      key: 'cdmsUrlVeeva', //??
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS URL (only required for Rave and Veeva CDMS)',
        disabled:true,
        options: this.studyCdmsService.getVeevaVaultUrls(),
        valueProp: "id",
        labelProp: "value",

        placeholder: '-Select from Veeva Vault Urls-',

        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      hideExpression: '!model?.isVeevaCdms',
      validation: {
        show: true
      }
    },
    {
      key: 'urlVaultLoginUserName',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'URL/Vault Login User Name',
        helpText: 'URL/Vault Login User Name',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6',
        description:'Applicable for all EDCs and enter only generic accounts(if applicable). Do Not Enter any user specific accounts'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'urlVaultLoginPassword',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'URL/Vault Login Password',
        helpText: 'URL/Vault Login Password',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6',
        description:'Applicable for all EDCs and enter only generic accounts(if applicable). Do Not Enter any user specific accounts'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'extractVersion',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Extract Version',
        helpText: 'Extract Version',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'fileTypeFormat',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'File Type/Format',
        options: this.tblParamService.getParams(this.fileFormatParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',

        helpText: 'File Type / Format',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },

    {
      key: 'zipFileTragetDelivery',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Zip File Target / Delivery',

        options: this.tblParamService.getParams(this.zipFileTargetParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',

        helpText: 'Zip File Target / Delivery',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'ftplocation',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'FTP Location',
        helpText: 'FTP Location',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'nameOfExtract',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Name of Extract',
        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'extractPassword',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Extract Password',
        helpText: 'Extract Password',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'timeOfScheduledExtracts',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Time of the Scheduled Extracts',
        helpText: 'Time of the Scheduled Extracts',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          template: '<label class="form-label"><b>Inform</b></label>'
        }
      ],
      hideExpression: 'model.cdmsType != "Inform"'
    },
    {
      templateOptions: { label: 'Inform' },
      className: 'row',
      fieldGroup: [
        {
          key: 'informDTO.extractScopeId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Extarct Scope',
            options: this.tblParamExtendedService.getParams(this.extractScopeParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Extarct Scope',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        }
      ],
      hideExpression: 'model.cdmsType != "Inform"'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [{ className: 'col-6', template: '<label class="form-label"><b>Veeva CDMS</b></label>' }],
      hideExpression: 'model.cdmsType != "Veeva"'
    },
    {
      className: 'row',
      templateOptions: { label: 'Veeva CDMS' },
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            { className: 'col-6', template: '<label class="form-label">Include Restricted Data</label>' },
            {
              className: 'col-6',
              key: 'veevaDTO.includeRestrictedData',
              type: 'checkbox',
              validation: {
                show: true
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            { className: 'col-6', template: '<label class="form-label">Use Item External ID instead of Item Name for column headers</label>' },
            {
              className: 'col-6',
              key: 'veevaDTO.useItemExternalId',
              type: 'checkbox',
              validation: {
                show: true
              }
            }
          ]
        },

        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            { className: 'col-6', template: '<label class="form-label">Include separate Date and Time columns for Datetime items</label>' },
            {
              className: 'col-6',
              key: 'veevaDTO.includeSeparateDate',
              type: 'checkbox',
              validation: {
                show: true
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            { className: 'col-6', template: '<label class="form-label">Include forms intentionally left blank</label>' },
            {
              className: 'col-6',
              key: 'veevaDTO.includeFormsIntentionallyLeftBlank',
              type: 'checkbox',
              validation: {
                show: true
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            { className: 'col-6', template: '<label class="form-label">Exclude blank forms</label>' },
            {
              className: 'col-6',
              key: 'veevaDTO.excludeBlankForms',
              type: 'checkbox',
              validation: {
                show: true
              }
            }
          ]
        },
        {
          key: 'veevaDTO.booleanFormattingId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Boolean Formatting',
            options: this.tblParamExtendedService.getParams(this.booleanFormattingParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Boolean Formatting',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            { className: 'col-6', template: '<label class="form-label">Export all System Datasets</label>' },
            {
              className: 'col-6',
              key: 'veevaDTO.exportAllSystemDatasets',
              type: 'checkbox',
              validation: {
                show: true
              }
            }
          ]
        },
        {
          key: 'veevaDTO.exportAllSystemDatasetsTxt',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Export all System Datasets(un-checked)',
            helpText: 'Export all System Datasets(un-checked)',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          hideExpression: 'model?.veevaDTO.exportAllSystemDatasets',
          validation: {
            show: true
          }
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            { className: 'col-6', template: '<label class="form-label">Export all Clinical Datasets</label>' },
            {
              className: 'col-6',
              key: 'veevaDTO.exportAllClinicalDatasets',
              type: 'checkbox',
              validation: {
                show: true
              }
            }
          ]
        },

        {
          key: 'veevaDTO.exportAllClinicalDatasetsTxt',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Export all Clinical Datasets(un-checked)',
            helpText: 'Export all Clinical Datasets(un-checked)',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          hideExpression: 'model?.veevaDTO.exportAllClinicalDatasets',
          validation: {
            show: true
          }
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            { className: 'col-6', template: '<label class="form-label">Include Custom Objects</label>' },
            {
              className: 'col-6',
              key: 'veevaDTO.includeCustomObjects',
              type: 'checkbox',
              validation: {
                show: true
              }
            }
          ]
        },
        {
          key: 'veevaDTO.includeCustomObjectsTxt',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Include Custom Objects (checked)',
            helpText: 'Include Custom Objects (checked)',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          hideExpression: '!model?.veevaDTO.includeCustomObjects',
          validation: {
            show: true
          }
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            { className: 'col-6', template: '<label class="form-label">Include Study Design</label>' },
            {
              className: 'col-6',
              key: 'veevaDTO.includeStudyDesign',
              type: 'checkbox',
              validation: {
                show: true
              }
            }
          ]
        },
        {
          key: 'veevaDTO.itemDisplayLabelId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Item Display Label',
            options: this.tblParamExtendedService.getParams(this.itemDisplayLabelParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Item Display Label',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        }
      ],
      hideExpression: 'model.cdmsType != "Veeva"'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [{ className: 'col-6', template: '<label class="form-label"><b>Rave</b></label>' }],
      hideExpression: 'model.cdmsType != "Rave"'
    },
    {
      className: 'row',
      templateOptions: { label: 'Rave' },
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            { className: 'col-6', template: '<label class="form-label">Use Prod Views</label>' },
            {
              className: 'col-6',
              key: 'raveDTO.useProdViews',
              type: 'checkbox',
              validation: {
                show: true
              }
            }
          ]
        },
        {
          key: 'raveDTO.characterSet',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Character Set',
            options: this.tblParamExtendedService.getParams(this.characterSetParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Character Set',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },

        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            { className: 'col-6', template: '<label class="form-label">Drop system variables StudyID and SubjectID from extracts</label>' },
            {
              className: 'col-6',
              key: 'raveDTO.dropSystemVariablesStudyId',
              type: 'checkbox',
              validation: {
                show: true
              }
            }
          ]
        },
        {
          key: 'raveDTO.viewTypeId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'View Type',
            options: this.tblParamExtendedService.getParams(this.viewTypeParId),
            valueProp: 'recId',
            labelProp: 'description',
            placeholder: '-Select-',
            helpText: 'View Type',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'raveDTO.datasetsToExclude',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Datasets to exclude (FORM OIDs with comma separator)',
            helpText: 'Datasets to exclude (FORM OIDs with comma separator)',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },

          validation: {
            show: true
          }
        },
        {
          key: 'raveDTO.omrsetupId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'OMR Setup?',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',
            placeholder: '-Select-',
            helpText: 'OMR Setup?',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'raveDTO.deletedFieldsIncludedId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Deleted Fields Included?',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',
            placeholder: '-Select-',
            helpText: 'Deleted Fields Included?',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'raveDTO.localLabId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Local Lab?',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',
            placeholder: '-Select-',
            helpText: 'Local Lab?',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'raveDTO.roleForExtract',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Role for Extract',
            helpText: 'Role for Extract',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },

          validation: {
            show: true
          }
        },
        {
          key: 'raveDTO.userGroupForExtract',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'User Group for Extract',
            helpText: 'User Group for Extract',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },

          validation: {
            show: true
          }
        }
      ],
      hideExpression: 'model.cdmsType != "Rave"'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [{ className: 'col-6', template: '<label class="form-label"><b>Clinic Info</b></label>' }],
      hideExpression: 'model.cdmsType != "ClinInfo"'
    },
    {
      className: 'row',
      templateOptions: { label: 'Clinic Info' },
      fieldGroup: [
        {
          key: 'clinInfoDTO.exportOrientationId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Export Orientation',
            options: this.tblParamExtendedService.getParams(this.exportOrientationParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Export Orientation',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.shortLabelId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Short Label',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Short Label',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.longLabelId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Long Label',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Long Label',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.itemId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'ItemID',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'ItemID',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.unitsId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Units',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Units',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.visitNumberId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Visit number',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Visit number',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.sasnamingModeId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'SAS Naming Mode',
            options: this.tblParamExtendedService.getParams(this.sasNamingModeParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'SAS Naming Mode',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.dataId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Data',
            options: this.tblParamExtendedService.getParams(this.dataParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Data',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.patientIdAnonymizationId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Patient ID anonymization',
            options: this.tblParamExtendedService.getParams(this.patientIdAnonymizationParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Patient ID anonymization',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.siteListToExportId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Site list to export',
            options: this.tblParamExtendedService.getParams(this.exportListParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Site list to export',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.siteListToExportTxt',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Site list to export (custom)',
            helpText: 'Site list to export (custom)',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          hideExpression: x => x.clinInfoDTO?.siteListToExportId != this.customExportListRecId,
          validation: {
            show: true
          }
        },
        {
          key: 'clinInfoDTO.patientListOfExportId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Patient list to export',
            options: this.tblParamExtendedService.getParams(this.exportListParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Patient list to export',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.patientListOfExportTxt',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Patient list to export (custom)',
            helpText: 'Patient list to export (custom)',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          hideExpression: x => x.clinInfoDTO?.patientListOfExportId != this.customExportListRecId,
          validation: {
            show: true
          }
        },
        {
          key: 'clinInfoDTO.formListToExportId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Form list to export',
            options: this.tblParamExtendedService.getParams(this.exportListParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Form list to export',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.formListToExportTxt',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Form list to export (custom)',
            helpText: 'Form list to export (custom)',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          hideExpression: x => x.clinInfoDTO?.formListToExportId != this.customExportListRecId,
          validation: {
            show: true
          }
        },
        {
          key: 'clinInfoDTO.saslibraryNameId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'SAS library name',
            options: this.tblParamExtendedService.getParams(this.sasLibraryNameParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'SAS library name',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.qualityOfFormsToBeExportedId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Quality of forms to be exported',
            options: this.tblParamExtendedService.getParams(this.formsQualityParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Quality of forms to be exported',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.listOfForms',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'List of Forms',
            helpText: 'List of Forms',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          },
          hideExpression: x => x.clinInfoDTO?.qualityOfFormsToBeExportedId != this.specificFormsRecId,
          validation: {
            show: true
          }
        },
        {
          key: 'clinInfoDTO.encodeSasFileUsingUtf8id',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Encode SAS files using UTF-8',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Encode SAS files using UTF-8',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.convertPartialDatesId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Covert partial dates into complete dates',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Covert partial dates into complete dates',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'clinInfoDTO.convertIncompleteDatesId',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Convert incomplete dates into complete dates',
            options: this.tblParamService.getParams(this.yesNoParId),
            valueProp: 'recId',
            labelProp: 'description',

            placeholder: '-Select-',

            helpText: 'Convert incomplete dates into complete dates',
            labelColClassName: 'col-6',
            fieldColClassName: 'col-6'
          }
        }
      ],
      hideExpression: 'model.cdmsType!="ClinInfo"'
    }

  ];

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
    this.checkTimelineValSub?.unsubscribe();
    this.getRaveVeevaIconOwnedValueSub?.unsubscribe();
  }
}
