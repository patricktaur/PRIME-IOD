import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTasksGroupsFilterComponent } from './cdms-tasks-groups-filter.component';

describe('CdmsTasksGroupsFilterComponent', () => {
  let component: CdmsTasksGroupsFilterComponent;
  let fixture: ComponentFixture<CdmsTasksGroupsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTasksGroupsFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTasksGroupsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
