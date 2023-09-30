import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';

@Component({
  selector: 'app-cdms-tracker-filter-shell',
  templateUrl: './cdms-tracker-filter-shell.component.html',
  styleUrls: ['./cdms-tracker-filter-shell.component.css']
})
export class CdmsTrackerFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
