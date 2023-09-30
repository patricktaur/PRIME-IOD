import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
  ViewChild,
  ComponentRef,
  SimpleChanges
} from '@angular/core';
import { PlaceholderDirective } from '@app/shared/directives/placeholder.directive';
import { FilterComponentTypeAService } from '@app/prism/reports/filter-component-type-a.service';

import { IFilterTypeA } from '@app/prism/reports/filter-shell/ifilter-type-a';

@Component({
  selector: 'app-report-filter-s-shell',
  templateUrl: './report-filter-s-shell.component.html',
  styleUrls: ['./report-filter-s-shell.component.css']
})
export class ReportFilterSShellComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: true }) placeholder: PlaceholderDirective | any;
  @Input() filterGroup: number = 0;
  @Output() filterChange = new EventEmitter<any>();

  filt: any;

  testFilteredRecords: any;
  componentRef: ComponentRef<any> | any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private filterComponentService: FilterComponentTypeAService
  ) {}

  ngOnInit(): void {
    this.loadComponent(this.filterGroup);
  }

  loadComponent(filterGroup: number) {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    const filterComp = this.filterComponentService.getFilter(filterGroup);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(filterComp);
    const viewContainerRef = this.placeholder.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);

    /** @Output data from our instance  */
    (this.componentRef.instance as IFilterTypeA).filterChange.subscribe((data: any) => this.onFiltersChange(data));
  }

  onFiltersChange(filt: any) {
    this.filterChange.emit(filt);
  }
}
