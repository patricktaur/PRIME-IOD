import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudyService } from '@app/prism/study/study.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
@Component({
  selector: 'app-study-container',
  templateUrl: './study-container.component.html',
  styleUrls: ['./study-container.component.css']
  // providers: [StudyEditService]
})
export class StudyContainerComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  // studyIconNumbers: any;
  selectedStudyId: any;
  studyProperties: any;
  study: any;

  menuWidth = 3;
  studyType = '';

  subscription: Subscription | undefined;
  subscription1: Subscription | undefined;

  constructor(
    private studyService: StudyService,
    private studyEditService: StudyEditService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.selectedStudyId = params.id;

    //   this.subscription1 = this.studyEditService.getStudyProperties().subscribe((st: any) => {
    //     this.studyProperties = st;
    //   });
    // });
    this.subscription1 = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyProperties = st;
      const studyType = this.studyProperties?.studyType;
      if (studyType !== this.studyType) {
        // studyType !== undefined && this.studyType !== undefined &&
        this.studyType = studyType;
        if (studyType == 'CRM') {
          // this.router.navigate(['/study/crm-tabs/crm-study-award-management']);
        } else {
          //this.router.navigate(['/study/review/sign-off']);
        }
      }
    }); //http://localhost:4200/study/review/sign-off
  }

  menuClass() {
    // if (this.menuWidth == 3) {
    //   return `col-3 pe-0`;
    // } else {
    //   return `col-1 pe-0 overflow-hidden text-truncate text-nowrap`;
    // }
    if (this.menuWidth == 3) {
      return `col-3 px-0 position-relative`;
    } else {
      return `col-1 px-0 overflow-hidden text-truncate text-nowrap position-relative`;
    }
    //return `col-${this.menuWidth} pe-0`; //"col-1 pe-0";
  }
  toggleMenuWidth() {
    if (this.menuWidth == 3) {
      this.menuWidth = 1;
    } else {
      this.menuWidth = 3;
    }
  }
  //overflow-hidden text-truncate text-nowrap
  collapse() {
    if (this.menuWidth == 3) {
      return 'bi bi-arrow-bar-left';
    } else {
      return 'bi bi-arrow-bar-right';
    }
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
  }
}
