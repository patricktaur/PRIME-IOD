import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyKpiDashboardComponent } from './study-kpi-dashboard.component';

describe('StudyKpiDashboardComponent', () => {
  let component: StudyKpiDashboardComponent;
  let fixture: ComponentFixture<StudyKpiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyKpiDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyKpiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
