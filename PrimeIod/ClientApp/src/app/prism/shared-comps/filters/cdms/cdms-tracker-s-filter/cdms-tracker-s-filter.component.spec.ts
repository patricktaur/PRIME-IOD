import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTrackerSFilterComponent } from './cdms-tracker-s-filter.component';

describe('CdmsTrackerSFilterComponent', () => {
  let component: CdmsTrackerSFilterComponent;
  let fixture: ComponentFixture<CdmsTrackerSFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTrackerSFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTrackerSFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
