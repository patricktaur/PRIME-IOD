import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTrackerGroupFilterComponent } from './cdms-tracker-group-filter.component';

describe('CdmsTrackerGroupFilterComponent', () => {
  let component: CdmsTrackerGroupFilterComponent;
  let fixture: ComponentFixture<CdmsTrackerGroupFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTrackerGroupFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTrackerGroupFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
