import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDashboardHorizontalComponent } from './study-dashboard-horizontal.component';

describe('StudyDashboardHorizontalComponent', () => {
  let component: StudyDashboardHorizontalComponent;
  let fixture: ComponentFixture<StudyDashboardHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyDashboardHorizontalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDashboardHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
