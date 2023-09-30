import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-imi-cdms-task-list-filter-shell',
  templateUrl: './imi-cdms-task-list-filter-shell.component.html',
  styleUrls: ['./imi-cdms-task-list-filter-shell.component.css']
})
export class ImiCdmsTaskListFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
