import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-ngx-file-upload',
  templateUrl: './ngx-file-upload.component.html',
  styleUrls: ['./ngx-file-upload.component.css']
})
export class NgxFileUploadComponent {
  @Output() controlChange: EventEmitter<FormControl> = new EventEmitter<FormControl>();
  control: FormControl = new FormControl<File[]>([], [Validators.required, FileUploadValidators.accept(['.csv']), FileUploadValidators.filesLimit(1)]);

  constructor() {
  
  }

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.controlChange.emit(this.control);
    });
  }
}
