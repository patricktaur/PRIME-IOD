import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-imi-ra-out-req-filters-shell',
  templateUrl: './imi-ra-out-req-filters-shell.component.html',
  styleUrls: ['./imi-ra-out-req-filters-shell.component.css']
})
export class ImiRaOutReqFiltersShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
