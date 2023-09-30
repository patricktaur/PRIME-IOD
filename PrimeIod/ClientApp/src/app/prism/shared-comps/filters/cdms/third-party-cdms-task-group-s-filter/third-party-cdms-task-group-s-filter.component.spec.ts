import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyCdmsTaskGroupSFilterComponent } from './third-party-cdms-task-group-s-filter.component';

describe('ThirdPartyCdmsTaskGroupSFilterComponent', () => {
  let component: ThirdPartyCdmsTaskGroupSFilterComponent;
  let fixture: ComponentFixture<ThirdPartyCdmsTaskGroupSFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyCdmsTaskGroupSFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyCdmsTaskGroupSFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
