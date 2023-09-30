import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-cdms-task-list-filter-shell',
  templateUrl: './cdms-task-list-filter-shell.component.html',
  styleUrls: ['./cdms-task-list-filter-shell.component.css']
})
export class CdmsTaskListFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
