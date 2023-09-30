import { Component } from '@angular/core';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import * as CrmData from "./crm-data.json";
import { CrmPopoverComponent } from './crm-popover.component';

@Component({
  selector: 'app-crm-list',
  templateUrl: './crm-list.component.html',
  styleUrls: ['./crm-list.component.css']
})
export class CrmListComponent {
  Object = Object;
  crmDatas: any = (CrmData as any).default;

  constructor(private ngbModal: NgbModal) {

  }

  ngOnInit() {

  }

  onClickActual(year: any, month: any, val: any) {
    var modal = this.ngbModal.open(CrmPopoverComponent);
    modal.componentInstance.year = year;
    modal.componentInstance.month = month;
    modal.componentInstance.valObj = val;

    modal.result.then(
      result => {
        if (result) {
          // this.addArea(result);
          this.crmDatas[year][month] = result;
        }
      },
      err => {}
    );
  }

  getStyle(actual: any) {
    if(actual == null) {
      return {};
    } else if(actual == 0) {
      return {
        'background-color': 'orange',
        color: 'black'
      };
    } else {
      return {
        'background-color': '#73d773',
        color: 'white'
      };
    }
    
  }

  getStyleForForecast(forecast: any) {
    if(forecast != null) {
      return {'background-color': '#b7eef9ad'}
    } else {
      return {};
    }
  }
}
