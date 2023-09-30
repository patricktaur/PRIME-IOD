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
import { FilterComponentService } from '@app/prism/reports/filter-component.service';
// import { IFilter } from '@app/prism/reports/filters/ifilter';
import { IFilter } from '@app/prism/reports/filter-shell/ifilter';

@Component({
  selector: 'app-study-filter-shell',
  templateUrl: './study-filter-shell.component.html',
  styleUrls: ['./study-filter-shell.component.css']
})
export class StudyFilterShellComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: true }) placeholder: PlaceholderDirective | any;
  @Input() filterGroup: number = 0;
  @Input() records: any;
  @Output() filteredRecords = new EventEmitter<any>();
  //@Output() changeEmit: EventEmitter<string> = new EventEmitter<string>();
  testFilteredRecords: any;
  componentRef: ComponentRef<any> | any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private filterComponentService: FilterComponentService
  ) {}

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {

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

    (this.componentRef.instance as IFilter).inputRecords = this.records;
    /** @Output data from our instance  */
    (this.componentRef.instance as IFilter).outputRecords.subscribe((data: any) => this.onFilteredRecordsChange(data));

    // (this.componentRef.instance as IFilter).searchTerm.subscribe(
    //   (data : any) => this.onFilteredRecordsChange(data)
    // );
  }

  onFilteredRecordsChange(filteredRecords: any) {
    this.testFilteredRecords = filteredRecords;
    // this.filteredRecords = filteredRecords;
    this.filteredRecords.emit(filteredRecords);
  }

  // onSearchTextChange(value : string) {

  //   this.searchTextChange.emit(this.filterForm.value);
  // }
}
