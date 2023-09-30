import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';

@Component({
  selector: 'app-imi-timeline-filter-shell',
  templateUrl: './imi-timeline-filter-shell.component.html',
  styleUrls: ['./imi-timeline-filter-shell.component.css']
})
export class ImiTimelineFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
