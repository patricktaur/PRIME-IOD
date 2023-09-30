import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-cds-inst-filter-shell',
  templateUrl: './cds-inst-filter-shell.component.html',
  styleUrls: ['./cds-inst-filter-shell.component.css']
})
export class CdsInstFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
