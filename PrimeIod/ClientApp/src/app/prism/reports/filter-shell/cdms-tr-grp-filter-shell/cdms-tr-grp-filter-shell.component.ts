import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';

@Component({
  selector: 'app-cdms-tr-grp-filter-shell',
  templateUrl: './cdms-tr-grp-filter-shell.component.html',
  styleUrls: ['./cdms-tr-grp-filter-shell.component.css']
})
export class CdmsTrGrpFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
