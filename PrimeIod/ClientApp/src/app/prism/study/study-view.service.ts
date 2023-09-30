import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { StudyReviewService } from '@app/prism/study/study-review.service';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudyViewService {
  private studyIdSource: BehaviorSubject<number> = new BehaviorSubject(this.initialState);
  _studyId = this.studyIdSource.asObservable();

  private studyPropertiesSource: BehaviorSubject<any> = new BehaviorSubject(this.initialState);

  private studyEditModeSource: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(private studyReviewService: StudyReviewService) {}

	get initialState() {
    return <any>{};
  }

  get initialParamState() {
    return <any>[];
  }

  get studyId() {
    return this.studyIdSource.next(this.initialState);
  }

	getStudyId() {
    return this.studyIdSource.asObservable();
  }

	getStudyProperties(): any {
    return this.studyPropertiesSource.asObservable();
  }
}