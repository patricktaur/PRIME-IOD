import { Component, OnInit, Directive, OnDestroy } from '@angular/core';
import { AppInjector } from '@app/core/services/app-injector.service';
import { Subscription } from 'rxjs';

import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Directive()
export class StudyEditBase implements OnInit, OnDestroy {
  protected router: Router;
  protected httpService: StudyHttpService;
  protected location: Location;
  protected studyEditService: StudyEditService;

  loading: boolean = false;
  recId: number = 0;
  record: any;
  studyId: number = 0;
  form : FormGroup | any = new FormGroup({});
  controllerName: string = "";

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  studyPropSub: Subscription | undefined;
  constructor(
    // public router: Router,
    public route: ActivatedRoute // public location: Location, // public httpService: StudyHttpService
  ) {
    this.router = AppInjector.injector.get(Router);
    this.httpService = AppInjector.injector.get(StudyHttpService);
    this.location = AppInjector.injector.get(Location);
    this.studyEditService = AppInjector.injector.get(StudyEditService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      let editMode = params.editMode;

      if (editMode == 'add') {
        let studyId = params.studyId;

        this.loadNewRecord(studyId);
      } else {
        this.recId = params.id;

        this.loadRecord(this.recId);
      }
    });

    // this.studyEditService.setStudyEditMode(true);
  }

  loadRecord(recId: number) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.httpService.getRecordToEdit(this.controllerName, recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  loadNewRecord(studyId: any) {
    this.loading = true;
    this.loadNewRecordSub = this.httpService.getNew(this.controllerName, studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  addOrUpdate() {
    this.loading = true;

    this.addUpdateSub = this.httpService.addOrUpdate(this.controllerName, this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  submit() {
    if (this.form.valid) {
      this.addOrUpdate();
    }
  }

  back() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.studyEditService.setStudyEditMode(false);
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
  }
}
