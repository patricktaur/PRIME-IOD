import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-imi-menu',
  templateUrl: './imi-menu.component.html',
  styleUrls: ['./imi-menu.component.css']
})
export class ImiMenuComponent implements OnInit, OnDestroy {
  studyProperties: any;
  subscription: Subscription | undefined;
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyProperties = st;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
