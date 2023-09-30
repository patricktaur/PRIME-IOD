import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { FTEListService } from '../../fte/fte-list.service';
import { FTEResourceService } from '../fte-resource.service';
import { ToastService } from '@app/shared/services/toast.service';

@Component({
  selector: 'app-fte-resource-list',
  templateUrl: './fte-resource-list.component.html',
  styleUrls: ['./fte-resource-list.component.css']
})
export class FteResourceListComponent implements OnInit {
  uploadInProgress: boolean = false;
  downloadInProgress: boolean = false;
  alerts: any = [];

  public filesControl = new FormControl<File[]>([], [Validators.required, FileUploadValidators.accept(['.csv']), FileUploadValidators.filesLimit(1)]);
  public fileUploadControl = new FileUploadControl(
    { listVisible: true, accept: ['*.csv'], discardInvalid: true, multiple: false },
    [FileUploadValidators.accept(['*.csv']), FileUploadValidators.filesLimit(1)]
  );

  public fileUploadForm = this.formBuilder.group({
    files: this.filesControl
  });

  constructor(private formBuilder: FormBuilder,
    private fTEResourceService : FTEResourceService,
    private toastService: ToastService) {}

  ngOnInit(): void {}

  upload() {
    this.uploadInProgress = true;
    this.alerts = [];

    if(this.fileUploadForm.value.files && this.fileUploadForm.value.files?.length > 0) {
      this.fTEResourceService.uploadFile(this.fileUploadForm.value.files[0])
      .subscribe((res: any) => {
        this.uploadInProgress = false;
        if(res.hasError) {
          if(res.records.length > 0) {
            this.displayErrors(res.records);
          } else {
            this.alerts.push({
              type: 'danger',
              message: `<ul><li>${res.message}</li></ul>`
            });
          }
        } else {
          this.toastService.show('File uploaded successfully', { classname: 'bg-success text-light', delay: 3000 });
        }
      }, err => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      })
    }
  }

  removeFiles() {
    this.fileUploadForm.patchValue({
      files: []
    })
  }

  displayErrors(records: any) {
    var alertContent = `<ul>`;
    records.forEach((record: any) => {
      alertContent = alertContent + '<li>' + record + '</li>';
    });
    alertContent = alertContent + '</ul>';

    this.alerts.push({
      type: 'danger',
      message: alertContent
    });
  }

  onControlChange(control: FormControl) {
    this.fileUploadForm.controls.files.setValue(control.value);
  }

  downloadSampleTemplate() {
    this.downloadInProgress = true;
    this.fTEResourceService.getSampleTemplate()
    .subscribe((res: any) => {
      this.saveFile(res);
      this.downloadInProgress = false;
    })
  }

  saveFile(response: any) {
    const url = window.URL.createObjectURL(new Blob([response]));

    let anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'fte-resource-sample.csv';
    anchor.click();
  }
}
