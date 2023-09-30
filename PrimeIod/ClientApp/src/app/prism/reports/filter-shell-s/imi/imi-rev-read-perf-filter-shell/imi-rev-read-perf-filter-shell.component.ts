import { Component, OnInit } from '@angular/core';
import { FilterBaseTypeAComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base-type-a.component';

@Component({
  selector: 'app-imi-rev-read-perf-filter-shell',
  templateUrl: './imi-rev-read-perf-filter-shell.component.html',
  styleUrls: ['./imi-rev-read-perf-filter-shell.component.css']
})
export class ImiRevReadPerfFilterShellComponent extends FilterBaseTypeAComponent implements OnInit {
  ngOnInit(): void {}
}
