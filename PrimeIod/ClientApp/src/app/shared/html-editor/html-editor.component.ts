import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.css']
})
export class HtmlEditorComponent implements OnInit, AfterViewInit {
   @Input() htmlContent: string | undefined;
   @Input() rows: number = 3;
   @Input() toolbarPosition: 'top' | 'bottom' | undefined = 'top';
   @Input() showToolbar: boolean = true;
   @Input() defaultFontSize: string = '5'; //1 to 7
   
   @Output() changedContent = new EventEmitter<string>();

    // heightInRems = '5rem';
   
   ngOnInit(): void {
      //  this.heightInRems =  `${this.rows * 1.75}rem`; 
      this.config.height = `${this.rows * 1.75}rem`; //this.heightInRems;
      this.config.toolbarPosition = this.toolbarPosition;
      this.config.showToolbar = this.showToolbar;
      this.config.defaultFontSize = this.defaultFontSize;
   }

  ngAfterViewInit(): void {
    
  }

  onChange(value: string){
    // let valueX = this.sanitizer.bypassSecurityTrustHtml(value);
    
    this.changedContent.emit(value);
  }

  

  config: AngularEditorConfig = {
    editable: true,
    // showToolbar : false,
    spellcheck: true,
    height:  '15rem',
    minHeight: '3rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    defaultFontSize: '3',
    toolbarPosition: 'bottom',
    toolbarHiddenButtons: [
      [ 'undo', 'redo', 'strikeThrough', 
      'subscript', 'superscript', 
    //   'justifyCenter',
    // 'justifyRight',
    // 'justifyFull',
    'indent',
    'outdent',
    'insertUnorderedList',
    'insertOrderedList',
    'heading',
    'fontName',
    'customClasses',
    'link',
    'unlink',
    'insertVideo',
    // 'removeFormat',
    'toggleEditorMode'
    ]
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
}
