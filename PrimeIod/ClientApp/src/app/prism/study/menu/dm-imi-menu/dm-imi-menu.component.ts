import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-dm-imi-menu',
  templateUrl: './dm-imi-menu.component.html',
  styleUrls: ['./dm-imi-menu.component.css']
})
export class DmImiMenuComponent implements OnInit, OnDestroy {
  studyProperties: any;
  subscription: Subscription | undefined;

  constructor(private router: Router, private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    if (!this.router.url.startsWith('/study/imi')) {
      this.router.navigate(['/study/imi-review-group/imi-review-signoff']);
    }

    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyProperties = st;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
