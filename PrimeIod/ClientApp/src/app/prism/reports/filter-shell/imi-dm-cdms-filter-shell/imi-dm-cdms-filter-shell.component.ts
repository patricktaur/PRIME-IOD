import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';

@Component({
  selector: 'app-imi-dm-cdms-filter-shell',
  templateUrl: './imi-dm-cdms-filter-shell.component.html',
  styleUrls: ['./imi-dm-cdms-filter-shell.component.css']
})
export class ImiDmCdmsFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
