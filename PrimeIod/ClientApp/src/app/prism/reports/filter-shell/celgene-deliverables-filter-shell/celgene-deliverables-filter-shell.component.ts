import { Component, OnInit } from '@angular/core';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';
@Component({
  selector: 'app-celgene-deliverables-filter-shell',
  templateUrl: './celgene-deliverables-filter-shell.component.html',
  styleUrls: ['./celgene-deliverables-filter-shell.component.css']
})
export class CelgeneDeliverablesFilterShellComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {}
}
