import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClininfoCdmsTaskGroupsFilterComponent } from './clininfo-cdms-task-groups-filter.component';

describe('ClininfoCdmsTaskGroupsFilterComponent', () => {
  let component: ClininfoCdmsTaskGroupsFilterComponent;
  let fixture: ComponentFixture<ClininfoCdmsTaskGroupsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClininfoCdmsTaskGroupsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClininfoCdmsTaskGroupsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
