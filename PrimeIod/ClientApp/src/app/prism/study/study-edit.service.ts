import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { StudyReviewService } from '@app/prism/study/study-review.service';
import { pipe, from } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudyEditService {
  private studyIdSource: BehaviorSubject<number> = new BehaviorSubject(this.initialState);
  _studyId = this.studyIdSource.asObservable();

  private studyTypeSource: BehaviorSubject<string> = new BehaviorSubject(this.initialState);
  _studyType = this.studyTypeSource.asObservable();

  private studyPropertiesSource: BehaviorSubject<any> = new BehaviorSubject(this.initialState);

  private studyEditModeSource: BehaviorSubject<any> = new BehaviorSubject(false);

  private dashboardSource = new BehaviorSubject<string>('');
  dashboard = this.dashboardSource.asObservable();

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

  get studyType() {
    return this.studyTypeSource.next(this.initialState);
  }

  setStudyId(studyId: number) {
    this.studyIdSource.next(studyId);
  }

  setStudyType(studyType: string) {
    this.studyTypeSource.next(studyType);
  }

  getStudyId() {
    return this.studyIdSource.asObservable();
  }

  getStudyType() {
    return this.studyTypeSource.asObservable();
  }

  setStudyProperties(studyProperties: any) {
    this.studyPropertiesSource.next(studyProperties);
  }

  getStudyProperties(): any {
    return this.studyPropertiesSource.asObservable();
  }

  setStudyEditMode(studyEditMode: any) {
    this.studyEditModeSource.next(studyEditMode);
  }

  getStudyEditMode(): any {
    return this.studyEditModeSource.asObservable();
  }

  async setStudyIdAndLoadProperties(studyId: number) {
    this.setStudyId(studyId);
    await this.loadStudyPropertiesAsync();
    
  }

  setDashboard(value: string) {
    this.dashboardSource.next(value);
  }

  loadStudyProperties() {
    this.getStudyId()
      .pipe(take(1))
      .subscribe((studyId: number) => {
        if (studyId) {
          this.studyReviewService
            .getStudyDashboardDTO(studyId)
            .pipe(take(1))
            .subscribe(
              (res: any) => {
                if (res.status === 400) {
                  return;
                } else {
                  this.setStudyProperties(res);
                }
              },
              (err: any) => {
                console.log(`err = ${JSON.stringify(err, null, 2)}`);
                // this.isLoading = false;
              }
            );
        } else {
          throw new Error('loadStudyProperties is called before setting study Id');
        }
      });
  }

  //--
  async loadStudyPropertiesAsync() {
    this.getStudyId()
      .pipe(take(1))
      .subscribe(async (studyId: number) => {
        if (studyId) {
          const res = await from(this.studyReviewService.getStudyDashboardDTO(studyId)).toPromise();
          this.setStudyProperties(res);
          // if (res.status === 400) {
          //     return;
          // } else {
          //     this.setStudyProperties(res);
          // }
        } else {
          throw new Error('loadStudyProperties is called before setting study Id');
        }
      });

    //--
  }
}
