import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdmsTrackerEditComponent } from './study-cdms-tracker-edit.component';

describe('StudyCdmsTrackerEditComponent', () => {
  let component: StudyCdmsTrackerEditComponent;
  let fixture: ComponentFixture<StudyCdmsTrackerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdmsTrackerEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdmsTrackerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
