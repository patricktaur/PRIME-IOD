import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyCdmsTrackerViewComponent } from './imi-study-cdms-tracker-view.component';

describe('ImiStudyCdmsTrackerViewComponent', () => {
  let component: ImiStudyCdmsTrackerViewComponent;
  let fixture: ComponentFixture<ImiStudyCdmsTrackerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyCdmsTrackerViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyCdmsTrackerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
