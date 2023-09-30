import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsTrackerGroupSFilterComponent } from './imi-cdms-tracker-group-s-filter.component';

describe('ImiCdmsTrackerGroupSFilterComponent', () => {
  let component: ImiCdmsTrackerGroupSFilterComponent;
  let fixture: ComponentFixture<ImiCdmsTrackerGroupSFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsTrackerGroupSFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsTrackerGroupSFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
