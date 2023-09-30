import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyCdmsTaskGroupFilterShellComponent } from './third-party-cdms-task-group-filter-shell.component';

describe('ThirdPartyCdmsTaskGroupFilterShellComponent', () => {
  let component: ThirdPartyCdmsTaskGroupFilterShellComponent;
  let fixture: ComponentFixture<ThirdPartyCdmsTaskGroupFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyCdmsTaskGroupFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyCdmsTaskGroupFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
