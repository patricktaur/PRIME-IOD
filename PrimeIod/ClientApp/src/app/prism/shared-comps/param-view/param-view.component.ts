import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-param-view',
  templateUrl: './param-view.component.html',
  styleUrls: ['./param-view.component.css']
})
export class ParamViewComponent implements OnInit, OnChanges {
  @Input() disabled: boolean = false;
  @Input() parentSelectDropDownDisabled: boolean = false;
  @Input() canSelectChildItem: boolean = false;
  private _parId: number | any;
  @Input() set parId(value: number) {
    this._parId = value;
    this.parIdSet(value);
  }
  get parId() {
    return this._parId;
  }

  private _childItemId: number | any;
  @Input()
  set childItemId(value: number) {
    this._childItemId = value;
    this.childItemIdSet(value);
  }
  get childItemId() {
    return this._childItemId;
  }

  @Output() parentSelected = new EventEmitter<any>();
  @Output() childItemSelected = new EventEmitter<any>();

  displayParamParentSelectDropDown: boolean = true;
  displayChildItemList: boolean = true;
  selectParamParId: any;
  selectedChildId: number | any;
  paramParents: any;
  paramChildItems: any;

  constructor(private tblParamService: TblParamService) {}

  ngOnInit(): void {
    this.loadParamParents();
  }

  parIdSet(parId: number) {}

  childItemIdSet(childItemId: number) {
    if (!this.parId && this.childItemId) {
      console.log('childItemIdSet 1');
      this.selectedChildId = this.childItemId;
      this.getParId(this.childItemId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const latestchildItemId = changes['childItemId'];
    // if (latestchildItemId){
    //   console.log("Changed:" + latestchildItemId);
    // }
  }

  getParId(childItemId: number) {
    this.tblParamService.getParId(childItemId).subscribe((parId: any) => {
      // this.parId = parId;
      this.selectParamParId = parId;
      this.loadParamChildItems(parId);
    });
  }

  loadParamParents() {
    this.tblParamService.getParamParents().subscribe((recs: any) => {
      this.paramParents = recs as any[];
      if (this.parId > 0) {
        this.selectParamParId = this.parId;
        this.loadParamChildItems(this.parId);
      }
    });
  }

  onParamParentChange(value: any) {
    this.loadParamChildItems(value);
    this.parentSelected.emit(value);
    this.selectedChildId = 0;
    this.childItemId = 0;
    this.childItemSelected.emit(0);
  }

  loadParamChildItems(parId: number) {
    this.tblParamService.getParams(parId).subscribe((recs: any) => {
      this.paramChildItems = recs as any[];
    });
  }

  rowSelected(row: any) {
    if (this.canSelectChildItem) {
      this.selectedChildId = row.recId;
      this.childItemId = row.recId;
      // this.childItemSelected.emit(row.recId);
      this.childItemSelected.emit(row);
    }
  }

  showSelectUserAlert() {
    return this.selectParamParId > 0 ? false : true;
  }
}
