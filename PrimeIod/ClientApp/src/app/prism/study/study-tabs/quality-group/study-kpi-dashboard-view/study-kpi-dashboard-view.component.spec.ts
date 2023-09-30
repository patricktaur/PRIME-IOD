import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyKpiDashboardViewComponent } from './study-kpi-dashboard-view.component';

describe('StudyKpiDashboardViewComponent', () => {
  let component: StudyKpiDashboardViewComponent;
  let fixture: ComponentFixture<StudyKpiDashboardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyKpiDashboardViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyKpiDashboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
