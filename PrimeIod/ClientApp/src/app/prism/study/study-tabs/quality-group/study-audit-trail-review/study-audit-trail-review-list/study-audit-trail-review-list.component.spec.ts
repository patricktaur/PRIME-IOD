import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAuditTrailReviewListComponent } from './study-audit-trail-review-list.component';

describe('StudyAuditTrailReviewListComponent', () => {
  let component: StudyAuditTrailReviewListComponent;
  let fixture: ComponentFixture<StudyAuditTrailReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyAuditTrailReviewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyAuditTrailReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
