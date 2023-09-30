import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsTaskGroupsListComponent } from './imi-cdms-task-groups-list.component';

describe('ImiCdmsTaskGroupsListComponent', () => {
  let component: ImiCdmsTaskGroupsListComponent;
  let fixture: ComponentFixture<ImiCdmsTaskGroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsTaskGroupsListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsTaskGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
