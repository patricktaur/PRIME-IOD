import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';
@Component({
  selector: 'app-reg-port-dir-cdms-dmpm-filter-shell',
  templateUrl: './reg-port-dir-cdms-dmpm-filter-shell.component.html',
  styleUrls: ['./reg-port-dir-cdms-dmpm-filter-shell.component.css']
})
export class RegPortDirCdmsDmpmFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {
    this.loadFilters();
  }
}
