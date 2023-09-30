import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsTasksListComponent } from './imi-cdms-tasks-list.component';

describe('ImiCdmsTasksListComponent', () => {
  let component: ImiCdmsTasksListComponent;
  let fixture: ComponentFixture<ImiCdmsTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsTasksListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
