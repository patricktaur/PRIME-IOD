import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-cds-out-filter-shell',
  templateUrl: './cds-out-filter-shell.component.html',
  styleUrls: ['./cds-out-filter-shell.component.css']
})
export class CdsOutFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
