import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-dashboard',
  templateUrl: './table-dashboard.component.html',
  styleUrls: ['./table-dashboard.component.css']
})
export class TableDashboardComponent implements OnInit {
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
      color: 'white',
      'border-radius': '5px'
    };
  }

  getTitle(item: any) {
    // var displayWidth = item.displayWidth || item.displayText.length;
    // if (item.displayText?.length > displayWidth) {
    //   var toolTipLength = item.tooltip?.length || 0;

    //   if (toolTipLength == 0) {
    //     item.tooltip = item?.displayText;
    //   }
    //   // item.displayText = item?.displayText.substring(0, displayWidth - 4) + ' ...';
    //   //myString.substring(0,length);
    // }
    return item.tooltip || '';
  }

  canDrillDown(item: any) {
    return item?.canDrillDown && item?.value > 0 ? true : false;
  }
}
