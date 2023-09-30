import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyResourceDashboardComponent } from './study-resource-dashboard.component';

describe('StudyResourceDashboardComponent', () => {
  let component: StudyResourceDashboardComponent;
  let fixture: ComponentFixture<StudyResourceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyResourceDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyResourceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
