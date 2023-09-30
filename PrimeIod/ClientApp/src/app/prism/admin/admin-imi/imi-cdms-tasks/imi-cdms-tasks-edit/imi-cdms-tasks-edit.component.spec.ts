import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsTasksEditComponent } from './imi-cdms-tasks-edit.component';

describe('ImiCdmsTasksEditComponent', () => {
  let component: ImiCdmsTasksEditComponent;
  let fixture: ComponentFixture<ImiCdmsTasksEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsTasksEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsTasksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
