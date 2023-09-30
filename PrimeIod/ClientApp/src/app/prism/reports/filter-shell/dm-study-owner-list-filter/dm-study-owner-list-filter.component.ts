import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';

@Component({
  selector: 'app-dm-study-owner-list-shell-filter',
  templateUrl: './dm-study-owner-list-filter.component.html',
  styleUrls: ['./dm-study-owner-list-filter.component.css']
})
export class DmStudyOwnerListFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
