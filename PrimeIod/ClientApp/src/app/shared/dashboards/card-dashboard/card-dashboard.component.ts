import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.css']
})
export class CardDashboardComponent implements OnInit {
  @Input() dashboardItems: any;
  @Input() tag: string = '';

  @Output() itemClicked = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  onItemClicked(value: any) {
    const output = { tag: this.tag, selectedItem: value };
    this.itemClicked.emit(output);
  }

  getStyle(item: any) {
    return {
      'background-color': item.backgoundColor || '',
      'font-weight': item.fontWeight || '',
      color: 'white'
    };
  }

  getValueTextStyle(item: any) {
    return {
      'font-weight': item.valueFontWeight || '',
      'font-size': item.valueFontSize || item.fontWeight || '',
      color: item.valueTextColor || 'white'
    };
  }
  //font-weight : normal, bold, lighter, bolder, 100, 900
  getDescriptionTextStyle(item: any) {
    return {
      'background-color': item.backgoundColor || '',
      // 'font-weight': item.fontWeight || '',
      // color: 'white'
      'font-weight': item.descriptionFontWeight || '',
      'font-size': item.descriptionFontSize || '',
      color: item.descriptionTextColor || 'white'
    };
  }

  getTitle(item: any) {
    var displayWidth = item.displayWidth || item.displayText.length;
    if (item.displayText?.length > displayWidth) {
      var toolTipLength = item.tooltip?.length || 0;

      if (toolTipLength == 0) {
        item.tooltip = item?.displayText;
      }
      item.displayText = item?.displayText.substring(0, displayWidth - 4) + ' ...';
      //myString.substring(0,length);
    }
    return item.tooltip || '';
  }

  canDrillDown(item: any) {
    return item?.canDrillDown && item?.value > 0 ? true : false;
  }
}
