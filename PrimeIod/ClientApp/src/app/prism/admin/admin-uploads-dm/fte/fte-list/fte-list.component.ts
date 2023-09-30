import { Component } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import {FTEListService} from '../fte-list.service'
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastService } from '@app/shared/services/toast.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-fte-list',
  templateUrl: './fte-list.component.html',
  styleUrls: ['./fte-list.component.css']
})

export class FteListComponent   {
  uploadDetails: any = [];

  fileList1: string[] = [];
 
  selectedFile: File | null = null;
  selectedFileName = '';
  uploadInProgress = false;
  downloadInProgress: boolean = false;
  // errorMessage = '';
  // dragOver = false;

  alerts: any = [];

  public filesControl = new FormControl<File[]>([], [Validators.required, FileUploadValidators.accept(['.csv']), FileUploadValidators.filesLimit(1)]);
  public fileUploadControl = new FileUploadControl(
    { listVisible: true, accept: ['*.csv'], discardInvalid: true, multiple: false },
    [FileUploadValidators.accept(['*.csv']), FileUploadValidators.filesLimit(1)]
  );

  public fileUploadForm = this.formBuilder.group({
    files: this.filesControl
  });

  constructor(
    private fTEListService : FTEListService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public toastService: ToastService
    ) {}

  ngOnInit() {
     this.getUploadHistory();
  }

  setFileList(event: FileList) {
    console.log(event);
    this.fileList1 = Array.from(event).map(f => f.name);
    this.selectedFile = event[0];
  }

  onUpload() {
    if (!this.selectedFile) {
      return;
    }

    this.uploadInProgress = true;
    
    this.fTEListService.uploadFile(this.selectedFile).subscribe(
      // (event : any) =>{
      //   this.uploadInProgress = false;
      //   console.log("completed")
        
      // }
    );
  }

  upload() {
    this.uploadInProgress = true;
    this.alerts = [];

    if(this.fileUploadForm.value.files && this.fileUploadForm.value.files?.length > 0) {
      this.fTEListService.uploadFile(this.fileUploadForm.value.files[0])
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
      }, (err: any) => {
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

  getUploadHistory() {
    this.fTEListService.getUploadHistory()
    .subscribe(res => {
      this.uploadDetails = res;
    })
  }

  onControlChange(control: FormControl) {
    this.fileUploadForm.controls.files.setValue(control.value);
  }

  downloadSampleTemplate() {
    this.downloadInProgress = true;
    this.fTEListService.getSampleTemplate()
    .subscribe((res: any) => {
      this.saveFile(res);
      this.downloadInProgress = false;
    })
  }

  saveFile(response: any) {
    const url = window.URL.createObjectURL(new Blob([response]));

    let anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'fte-list-sample.csv';
    anchor.click();
  }

}
