import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, DecimalPipe } from '@angular/common';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';
import { YesNoPipe } from '@app/shared/pipes/yes-no.pipe';

@Component({
  selector: 'app-cell ',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  // @Input() value: any;
  // @Input() column: any;
  @Input() column: UIGridColumn | any;

  @Input() record: any = {};
  @Output() raiseEvent = new EventEmitter<any>();

  // public toolTip : string = "";
  constructor(
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private yesNoPipe: YesNoPipe,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  get value(): any {
    if (this.column.field) {
      let value = this.record[this.column.field];
      // if(this.column.pipe == "date") {
      //   value = this.datePipe.transform(value, this.column.format);
      // }
      return value
    } else {
      return '';
    }
  }

  get linkValue(): any {
    return this.record[this.column?.linkField];
  }

  get linkRoute(): any {
    return this.column?.linkPath;
  }

  get linkText(): any {
    if (this.column?.linkText) {
      return this.column?.linkText;
    } else {
      return this.formattedText;
    }
  }

  get formattedText() {
    switch (this.column?.type) {
      case 'date': {
        if (this.column.format != null && this.column.format.length > 0) {
          return this.datePipe.transform(this.value, this.column?.format);
        } else {
          return this.value;
        }
        break;
      }
      case 'number': {
        // return this.value;
        if (this.column.format != null && this.column.format.length > 0) {
          return this.decimalPipe.transform(this.value, this.column?.format);
        } else {
          return this.value;
        }
        break;
      }

      case 'bool-yes-no': {
        // return this.value;
        return this.yesNoPipe.transform(this.value);
        // if (this.value){
        //   return this.yesNoPipe.transform(this.value);
        // }else{
        //   return this.value;
        // }

        // if (this.column.format != null && this.column.format.length > 0) {
        //   return this.yesNoPipe.transform(this.value);
        // } else {
        //   return this.value;
        // }
        break;
      }

      default: {
        if (this.column.width != null && this.column.width > 0) {
          let width = this.column.width - 4;
          if (this.value?.length > width) {
            //  this.toolTip = this.value;
            let truncatedValue = this.value?.substr(0, width) + ' ...';
            return truncatedValue;
          } else {
            return this.value;
          }
        } else {
          return this.value;
        }
        break;
      }
    }
  }

  get actionType() {
    return String(this.column?.actionType ?? '').trim();
  }

  get actionValue(): any {
    return this.record[this.column?.actionField];
  }
  get actionTextField(): any {
    return this.record[this.column?.actionTextField];
  }
  get toolTip() {
    if (this.column?.width > 0 && this.column?.width - 4 < this.value?.length) {
      return this.value;
    } else {
      return '';
    }
  }

  get backgroundStyle(): any {
    let style = this.column?.backgroundStyle;
    let retStyle = {};
    switch (style) {
      case 'one-to-five-score': {
        retStyle = this.oneToFiveScoreStyle(this.value);
        break;
      }
      case 'abcd': {
        //statements;
        break;
      }
      default: {
        retStyle = style;
        break;
      }
    }
    return retStyle;
  }

  // colorValue: string[] = ['#ff0000', '#ff0000', '#ff0000', '#ffc000', '#ffc000', '#92d050'];

  colorValue: string[] = ['#F44336', '#F44336', '#F44336', '#FFC107', '#FFC107', '#66BB6A'];

  oneToFiveScoreStyle(value: number) {
    return {
      // color: 'white',
      'background-color': this.colorValue[value],
      'text-align': 'center',
      'vertical-align': 'middle',
      'font-weight': 'bold',
      padding: '5px',
      color: 'white',
      'border-radius': '5px'
    };
  }

  redirectTo() {
    this.router.navigate([this.linkRoute], {
      relativeTo: this.actRoute.parent,
      queryParams: { id: this.linkValue },
      state: { id: this.linkValue }
    });
  }

  onRaiseEvent(event: Event) {
    let actionObject = {
      actionCommand: this.column?.actionCommand,
      actionValue: this.actionValue,
      actionTextField: this.actionTextField
    };
    this.raiseEvent.emit(actionObject);
  }
}
