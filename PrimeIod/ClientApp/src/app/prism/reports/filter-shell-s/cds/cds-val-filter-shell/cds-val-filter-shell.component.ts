import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-cds-val-filter-shell',
  templateUrl: './cds-val-filter-shell.component.html',
  styleUrls: ['./cds-val-filter-shell.component.css']
})
export class CdsValFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
