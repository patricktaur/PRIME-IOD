import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-cds-dely-filter-shell',
  templateUrl: './cds-dely-filter-shell.component.html',
  styleUrls: ['./cds-dely-filter-shell.component.css']
})
export class CdsDelyFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
