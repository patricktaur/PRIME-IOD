import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsTasksGroupsFilterComponent } from './imi-cdms-tasks-groups-filter.component';

describe('ImiCdmsTasksGroupsFilterComponent', () => {
  let component: ImiCdmsTasksGroupsFilterComponent;
  let fixture: ComponentFixture<ImiCdmsTasksGroupsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsTasksGroupsFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsTasksGroupsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
