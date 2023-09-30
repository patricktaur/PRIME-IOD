import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';

@Component({
  selector: 'app-dm-icon-number-filter-shell',
  templateUrl: './dm-icon-number-filter-shell.component.html',
  styleUrls: ['./dm-icon-number-filter-shell.component.css']
})
export class DmIconNumberFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
