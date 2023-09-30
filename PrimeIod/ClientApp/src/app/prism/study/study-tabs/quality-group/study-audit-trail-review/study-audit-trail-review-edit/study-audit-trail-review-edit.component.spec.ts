import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAuditTrailReviewEditComponent } from './study-audit-trail-review-edit.component';

describe('StudyAuditTrailReviewEditComponent', () => {
  let component: StudyAuditTrailReviewEditComponent;
  let fixture: ComponentFixture<StudyAuditTrailReviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyAuditTrailReviewEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyAuditTrailReviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
