import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTaskGroupFilterShellComponent } from './cdms-task-group-filter-shell.component';

describe('CdmsTaskGroupFilterShellComponent', () => {
  let component: CdmsTaskGroupFilterShellComponent;
  let fixture: ComponentFixture<CdmsTaskGroupFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTaskGroupFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTaskGroupFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
