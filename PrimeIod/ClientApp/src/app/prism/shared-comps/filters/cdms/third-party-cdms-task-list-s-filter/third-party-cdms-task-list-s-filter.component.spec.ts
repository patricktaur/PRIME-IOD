import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyCdmsTaskListSFilterComponent } from './third-party-cdms-task-list-s-filter.component';

describe('ThirdPartyCdmsTaskListSFilterComponent', () => {
  let component: ThirdPartyCdmsTaskListSFilterComponent;
  let fixture: ComponentFixture<ThirdPartyCdmsTaskListSFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyCdmsTaskListSFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyCdmsTaskListSFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
