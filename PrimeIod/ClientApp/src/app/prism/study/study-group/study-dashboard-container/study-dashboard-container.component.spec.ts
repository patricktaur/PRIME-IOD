import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDashboardContainerComponent } from './study-dashboard-container.component';

describe('StudyDashboardContainerComponent', () => {
  let component: StudyDashboardContainerComponent;
  let fixture: ComponentFixture<StudyDashboardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyDashboardContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
