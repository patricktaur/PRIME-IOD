import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTaskListFilterShellComponent } from './cdms-task-list-filter-shell.component';

describe('CdmsTaskListFilterShellComponent', () => {
  let component: CdmsTaskListFilterShellComponent;
  let fixture: ComponentFixture<CdmsTaskListFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTaskListFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTaskListFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
