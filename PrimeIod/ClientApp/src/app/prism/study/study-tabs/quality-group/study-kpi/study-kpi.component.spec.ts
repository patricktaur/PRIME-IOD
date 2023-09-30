import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyKpiComponent } from './study-kpi.component';

describe('StudyKpiComponent', () => {
  let component: StudyKpiComponent;
  let fixture: ComponentFixture<StudyKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyKpiComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
