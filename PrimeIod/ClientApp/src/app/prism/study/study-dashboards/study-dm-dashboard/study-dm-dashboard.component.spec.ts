import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDmDashboardComponent } from './study-dm-dashboard.component';

describe('StudyDmDashboardComponent', () => {
  let component: StudyDmDashboardComponent;
  let fixture: ComponentFixture<StudyDmDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyDmDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
