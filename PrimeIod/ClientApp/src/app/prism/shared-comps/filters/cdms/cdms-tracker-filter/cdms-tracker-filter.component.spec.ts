import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTrackerFilterComponent } from './cdms-tracker-filter.component';

describe('CdmsTrackerFilterComponent', () => {
  let component: CdmsTrackerFilterComponent;
  let fixture: ComponentFixture<CdmsTrackerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTrackerFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTrackerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
