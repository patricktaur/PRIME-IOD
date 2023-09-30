import { Component, OnInit} from '@angular/core';
import { FieldType } from '@ngx-formly/core';
@Component({
  selector: 'app-html-editor-type',
  templateUrl: './html-editor-type.component.html',
  styleUrls: ['./html-editor-type.component.css']
})
export class HtmlEditorTypeComponent extends FieldType implements OnInit{
  htmlContent : string = '';
  

  constructor() {
    super();
   }
  ngOnInit(): void {
    this.formControl.valueChanges.pipe().subscribe((value: any) => {
      this.htmlContent = value;
    });
    
    
  }

  onChange(value: string){
   
    // let valueX = this.sanitizer.bypassSecurityTrustHtml(value);
    this.formControl.setValue(value);
    this.formControl.markAsDirty();
  }



}
