import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClininfoCdmsTaskGroupsListComponent } from './clininfo-cdms-task-groups-list.component';

describe('ClininfoCdmsTaskGroupsListComponent', () => {
  let component: ClininfoCdmsTaskGroupsListComponent;
  let fixture: ComponentFixture<ClininfoCdmsTaskGroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClininfoCdmsTaskGroupsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClininfoCdmsTaskGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
