import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';

@Component({
  selector: 'app-study-dbl-summary-filter-shell',
  templateUrl: './study-dbl-summary-filter-shell.component.html',
  styleUrls: ['./study-dbl-summary-filter-shell.component.css']
})
export class StudyDblSummaryFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
