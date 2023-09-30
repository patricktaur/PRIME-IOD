import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-cdms-task-group-filter-shell',
  templateUrl: './cdms-task-group-filter-shell.component.html',
  styleUrls: ['./cdms-task-group-filter-shell.component.css']
})
export class CdmsTaskGroupFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
