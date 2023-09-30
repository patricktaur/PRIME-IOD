import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-imi-cdms-task-grp-filter-shell',
  templateUrl: './imi-cdms-task-grp-filter-shell.component.html',
  styleUrls: ['./imi-cdms-task-grp-filter-shell.component.css']
})
export class ImiCdmsTaskGrpFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
