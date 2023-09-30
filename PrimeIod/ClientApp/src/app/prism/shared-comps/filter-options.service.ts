import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { Filters } from '@app/prism/shared-comps/filters';
@Injectable({
  providedIn: 'root'
})
export class FilterOptionsService {
  private filterSource: BehaviorSubject<Filters> = new BehaviorSubject(this.initialState);
  _filters = this.filterSource.asObservable();
  constructor(private filterService: SharedCompsService) {}

  get initialState() {
    return <any>{};
  }

  loadFilters() {
    //todo:
    //skip reload if already loaded

    this.reLoadFilters();
  }
  reLoadFilters() {
    this.filterService.getDMFilters().subscribe((filters: any) => {
      this.filterSource.next(filters);
    });
  }

  get filters() {
    return this.filterSource.next(this.initialState);
  }
}
