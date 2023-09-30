import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyCdmsTaskListFilterShellComponent } from './third-party-cdms-task-list-filter-shell.component';

describe('ThirdPartyCdmsTaskListFilterShellComponent', () => {
  let component: ThirdPartyCdmsTaskListFilterShellComponent;
  let fixture: ComponentFixture<ThirdPartyCdmsTaskListFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyCdmsTaskListFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyCdmsTaskListFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
