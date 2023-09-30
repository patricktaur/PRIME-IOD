import { Component, OnInit, Directive, Input, Output, EventEmitter } from '@angular/core';
// import { FilterBaseComponent } from '@app/prism/reports/filters/filter-base/filter-base.component';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';

@Component({
  selector: 'app-filter-one',
  templateUrl: './filter-one.component.html',
  styleUrls: ['./filter-one.component.css']
})
export class FilterOneComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
