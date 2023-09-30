import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-cds-dev-filter-shell',
  templateUrl: './cds-dev-filter-shell.component.html',
  styleUrls: ['./cds-dev-filter-shell.component.css']
})
export class CdsDevFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
