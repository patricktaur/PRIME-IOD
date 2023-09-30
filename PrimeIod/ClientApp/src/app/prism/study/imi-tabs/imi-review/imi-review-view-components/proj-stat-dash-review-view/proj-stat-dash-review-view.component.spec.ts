import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjStatDashReviewViewComponent } from './proj-stat-dash-review-view.component';

describe('ProjStatDashReviewViewComponent', () => {
  let component: ProjStatDashReviewViewComponent;
  let fixture: ComponentFixture<ProjStatDashReviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjStatDashReviewViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjStatDashReviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
