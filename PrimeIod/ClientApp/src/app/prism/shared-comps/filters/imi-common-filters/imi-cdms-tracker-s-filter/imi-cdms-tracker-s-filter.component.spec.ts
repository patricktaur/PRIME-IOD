import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsTrackerSFilterComponent } from './imi-cdms-tracker-s-filter.component';

describe('ImiCdmsTrackerSFilterComponent', () => {
  let component: ImiCdmsTrackerSFilterComponent;
  let fixture: ComponentFixture<ImiCdmsTrackerSFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsTrackerSFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsTrackerSFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
