import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClininfoCdmsTaskGroupsEditComponent } from './clininfo-cdms-task-groups-edit.component';

describe('ClininfoCdmsTaskGroupsEditComponent', () => {
  let component: ClininfoCdmsTaskGroupsEditComponent;
  let fixture: ComponentFixture<ClininfoCdmsTaskGroupsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClininfoCdmsTaskGroupsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClininfoCdmsTaskGroupsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
