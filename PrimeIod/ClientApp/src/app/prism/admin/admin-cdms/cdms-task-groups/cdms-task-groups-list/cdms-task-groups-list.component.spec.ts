import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTaskGroupsListComponent } from './cdms-task-groups-list.component';

describe('CdmsTaskGroupsListComponent', () => {
  let component: CdmsTaskGroupsListComponent;
  let fixture: ComponentFixture<CdmsTaskGroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTaskGroupsListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTaskGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
