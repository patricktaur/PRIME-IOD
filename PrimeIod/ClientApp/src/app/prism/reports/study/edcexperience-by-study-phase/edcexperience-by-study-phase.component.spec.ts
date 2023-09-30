import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EDCExperienceByStudyPhaseComponent } from './edcexperience-by-study-phase.component';

describe('EDCExperienceByStudyPhaseComponent', () => {
  let component: EDCExperienceByStudyPhaseComponent;
  let fixture: ComponentFixture<EDCExperienceByStudyPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EDCExperienceByStudyPhaseComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EDCExperienceByStudyPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
