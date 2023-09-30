import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-third-party-cdms-task-group-filter-shell',
  templateUrl: './third-party-cdms-task-group-filter-shell.component.html',
  styleUrls: ['./third-party-cdms-task-group-filter-shell.component.css']
})
export class ThirdPartyCdmsTaskGroupFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
