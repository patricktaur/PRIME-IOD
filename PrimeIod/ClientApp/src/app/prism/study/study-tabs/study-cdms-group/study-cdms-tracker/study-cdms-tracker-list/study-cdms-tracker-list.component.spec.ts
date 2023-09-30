import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdmsTrackerListComponent } from './study-cdms-tracker-list.component';

describe('StudyCdmsTrackerListComponent', () => {
  let component: StudyCdmsTrackerListComponent;
  let fixture: ComponentFixture<StudyCdmsTrackerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdmsTrackerListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdmsTrackerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
