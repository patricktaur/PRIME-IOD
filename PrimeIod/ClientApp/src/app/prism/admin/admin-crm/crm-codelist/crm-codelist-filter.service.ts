import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class CrmCodelistFilterService {
	filters: BehaviorSubject<any> = new BehaviorSubject(this.initialState);

	constructor() {}
	get initialState() {
		return {
			pageNumber: 1,
			pageSize: 10,
			parId: null
		};
	}

	setFilters(filters: any) {
		this.filters.next(filters);
	}

	getFilters() {
		return this.filters.value;
	}

	resetFilters() {
		this.filters.next(this.initialState);
	}

	getDefaultFilters() {
		return this.initialState;
	}
}