import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjStatDashReviewComponent } from './proj-stat-dash-review.component';

describe('ProjStatDashReviewComponent', () => {
  let component: ProjStatDashReviewComponent;
  let fixture: ComponentFixture<ProjStatDashReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjStatDashReviewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjStatDashReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
