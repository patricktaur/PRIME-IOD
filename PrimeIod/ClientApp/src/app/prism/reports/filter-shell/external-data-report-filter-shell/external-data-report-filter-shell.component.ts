import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';
@Component({
  selector: 'app-external-data-report-filter-shell',
  templateUrl: './external-data-report-filter-shell.component.html',
  styleUrls: ['./external-data-report-filter-shell.component.css']
})
export class ExternalDataReportFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
