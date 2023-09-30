import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTaskGroupsEditComponent } from './cdms-task-groups-edit.component';

describe('CdmsTaskGroupsEditComponent', () => {
  let component: CdmsTaskGroupsEditComponent;
  let fixture: ComponentFixture<CdmsTaskGroupsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTaskGroupsEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTaskGroupsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
