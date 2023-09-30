import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyKpiViewComponent } from './study-kpi-view.component';

describe('StudyKpiViewComponent', () => {
  let component: StudyKpiViewComponent;
  let fixture: ComponentFixture<StudyKpiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyKpiViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyKpiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
