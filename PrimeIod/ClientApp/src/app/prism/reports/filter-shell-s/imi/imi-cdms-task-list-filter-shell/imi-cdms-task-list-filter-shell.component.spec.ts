import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsTaskListFilterShellComponent } from './imi-cdms-task-list-filter-shell.component';

describe('ImiCdmsTaskListFilterShellComponent', () => {
  let component: ImiCdmsTaskListFilterShellComponent;
  let fixture: ComponentFixture<ImiCdmsTaskListFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsTaskListFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsTaskListFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
