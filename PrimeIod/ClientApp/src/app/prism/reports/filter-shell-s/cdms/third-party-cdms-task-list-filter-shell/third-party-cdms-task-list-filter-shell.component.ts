import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-third-party-cdms-task-list-filter-shell',
  templateUrl: './third-party-cdms-task-list-filter-shell.component.html',
  styleUrls: ['./third-party-cdms-task-list-filter-shell.component.css']
})
export class ThirdPartyCdmsTaskListFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
