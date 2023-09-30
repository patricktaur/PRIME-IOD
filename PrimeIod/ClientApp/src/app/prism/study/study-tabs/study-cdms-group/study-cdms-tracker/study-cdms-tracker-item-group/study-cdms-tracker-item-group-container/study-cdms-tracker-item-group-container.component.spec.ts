import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdmsTrackerItemGroupContainerComponent } from './study-cdms-tracker-item-group-container.component';

describe('StudyCdmsTrackerItemGroupContainerComponent', () => {
  let component: StudyCdmsTrackerItemGroupContainerComponent;
  let fixture: ComponentFixture<StudyCdmsTrackerItemGroupContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdmsTrackerItemGroupContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdmsTrackerItemGroupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
