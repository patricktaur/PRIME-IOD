import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-cds-cod-filter-shell',
  templateUrl: './cds-cod-filter-shell.component.html',
  styleUrls: ['./cds-cod-filter-shell.component.css']
})
export class CdsCodFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
