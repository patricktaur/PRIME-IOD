import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsTaskGroupsEditComponent } from './imi-cdms-task-groups-edit.component';

describe('ImiCdmsTaskGroupsEditComponent', () => {
  let component: ImiCdmsTaskGroupsEditComponent;
  let fixture: ComponentFixture<ImiCdmsTaskGroupsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsTaskGroupsEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsTaskGroupsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
