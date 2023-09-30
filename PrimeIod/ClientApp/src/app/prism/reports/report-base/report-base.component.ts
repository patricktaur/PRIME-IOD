import { Component, OnInit, Input } from '@angular/core';
import {
  GuiCellView,
  GuiColumn,
  GuiColumnMenu,
  GuiDataType,
  GuiPaging,
  GuiPagingDisplay,
  GuiRowColoring
} from '@generic-ui/ngx-grid';
@Component({
  selector: 'app-report-base',
  templateUrl: './report-base.component.html',
  styleUrls: ['./report-base.component.css']
})
export class ReportBaseComponent implements OnInit {
  @Input() columns: Array<GuiColumn> = [];
  @Input() records: any;
  constructor() {}

  ngOnInit(): void {}

  // columns: Array<GuiColumn> = [
  //   {
  //     header: 'Icon Number',
  //     field: 'studyIconNumber',
  //     type: GuiDataType.STRING,
  //     view: GuiCellView.TEXT
  //   },
  //   {
  //     header: 'Study Name',
  //     field: 'studyName' //source {type: 'clothes'}
  //   },
  //   {
  //     header: 'Sponsor',
  //     field: 'sponsor' //source {price: '15$'}
  //   },
  //   {
  //     header: 'Status',
  //     field: 'statusText' //source {price: '15$'}
  //   },
  //   {
  //     header: 'Overall Project Score',
  //     field: 'overallProjectScore' //source {price: '15$'}
  //   },
  //   {
  //     header: 'Alerts',
  //     field: 'alerts' //source {price: '15$'}
  //   }
  // ];

  paging: GuiPaging = {
    enabled: true,
    page: 1,
    pageSize: 10,
    pageSizes: [5, 10, 25, 50, 100],
    display: GuiPagingDisplay.ADVANCED
  };

  sorting = {
    enabled: true,
    multiSorting: true
  };

  columnMenu: GuiColumnMenu = {
    enabled: true,
    columnsManager: true
  };
}
