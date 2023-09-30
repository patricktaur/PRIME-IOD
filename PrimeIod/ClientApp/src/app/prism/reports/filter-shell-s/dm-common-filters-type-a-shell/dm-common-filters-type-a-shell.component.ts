import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-dm-common-filters-type-a-shell',
  templateUrl: './dm-common-filters-type-a-shell.component.html',
  styleUrls: ['./dm-common-filters-type-a-shell.component.css']
})
export class DmCommonFiltersTypeAShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
