import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTrackerGroupSFilterComponent } from './cdms-tracker-group-s-filter.component';

describe('CdmsTrackerGroupSFilterComponent', () => {
  let component: CdmsTrackerGroupSFilterComponent;
  let fixture: ComponentFixture<CdmsTrackerGroupSFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTrackerGroupSFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTrackerGroupSFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
