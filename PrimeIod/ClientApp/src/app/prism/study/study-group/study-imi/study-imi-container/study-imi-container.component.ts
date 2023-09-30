import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-imi-container',
  templateUrl: './study-imi-container.component.html',
  styleUrls: ['./study-imi-container.component.css']
})
export class StudyImiContainerComponent implements OnInit {
  rootPath = 'study/imi';
  studyProperties: any;
  subscription: Subscription | undefined;
  menuWidth = 3;
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyProperties = st;
    });
  }

  menuClass() {
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

  collapse() {
    if (this.menuWidth == 3) {
      return 'bi bi-arrow-bar-left';
    } else {
      return 'bi bi-arrow-bar-right';
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
