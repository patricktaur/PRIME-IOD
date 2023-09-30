import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { NaptrRecord } from 'dns';

@Component({
  selector: 'app-crm-menu',
  templateUrl: './crm-menu.component.html',
  styleUrls: ['./crm-menu.component.css']
})
export class CrmMenuComponent implements OnInit, OnDestroy {
  studyProperties: any;
  subscription: Subscription | undefined;
  routed: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private studyEditService: StudyEditService
  ) {}

  ngOnInit(): void {
    if (!this.router.url.startsWith('/study/crm-tabs')) {
      this.router.navigate(['/study/crm-tabs/crm-study-award-management']);
    }

    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyProperties = st;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
