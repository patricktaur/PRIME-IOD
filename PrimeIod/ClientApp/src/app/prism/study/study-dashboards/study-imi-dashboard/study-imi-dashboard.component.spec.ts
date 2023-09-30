import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyImiDashboardComponent } from './study-imi-dashboard.component';

describe('StudyImiDashboardComponent', () => {
  let component: StudyImiDashboardComponent;
  let fixture: ComponentFixture<StudyImiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyImiDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyImiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
