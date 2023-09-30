import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-dm-menu',
  templateUrl: './dm-menu.component.html',
  styleUrls: ['./dm-menu.component.css']
})
export class DmMenuComponent implements OnInit, OnDestroy {
  studyProperties: any;
  subscription: Subscription | undefined;
  routed: boolean = false;
  constructor(private router: Router, private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    let path = this.router.url;

    if (!path.startsWith('/study/dm')) {
      this.router.navigate(['/study/dm-review/sign-off']);
    }
    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyProperties = st;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
