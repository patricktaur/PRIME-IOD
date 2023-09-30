import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';

@Component({
  selector: 'app-imi-rev-issue-tracker-filter-shell',
  templateUrl: './imi-rev-issue-tracker-filter-shell.component.html',
  styleUrls: ['./imi-rev-issue-tracker-filter-shell.component.css']
})
export class ImiRevIssueTrackerFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
