import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-imi-ra-dev-req-filters-shell',
  templateUrl: './imi-ra-dev-req-filters-shell.component.html',
  styleUrls: ['./imi-ra-dev-req-filters-shell.component.css']
})
export class ImiRaDevReqFiltersShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
