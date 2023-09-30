import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-filter-shell-s-not-available',
  templateUrl: './filter-shell-s-not-available.component.html',
  styleUrls: ['./filter-shell-s-not-available.component.css']
})
export class FilterShellSNotAvailableComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
