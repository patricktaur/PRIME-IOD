import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';

@Component({
  selector: 'app-imi-common-filter-shell',
  templateUrl: './imi-common-filter-shell.component.html',
  styleUrls: ['./imi-common-filter-shell.component.css']
})
export class ImiCdmsFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
