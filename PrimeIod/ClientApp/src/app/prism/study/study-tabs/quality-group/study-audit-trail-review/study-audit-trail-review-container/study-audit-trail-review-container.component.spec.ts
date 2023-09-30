import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAuditTrailReviewContainerComponent } from './study-audit-trail-review-container.component';

describe('StudyAuditTrailReviewContainerComponent', () => {
  let component: StudyAuditTrailReviewContainerComponent;
  let fixture: ComponentFixture<StudyAuditTrailReviewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyAuditTrailReviewContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyAuditTrailReviewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
