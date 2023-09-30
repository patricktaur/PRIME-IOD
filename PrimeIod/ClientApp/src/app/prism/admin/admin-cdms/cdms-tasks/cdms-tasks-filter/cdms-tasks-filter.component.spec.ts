import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTasksFilterComponent } from './cdms-tasks-filter.component';

describe('CdmsTasksFilterComponent', () => {
  let component: CdmsTasksFilterComponent;
  let fixture: ComponentFixture<CdmsTasksFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTasksFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTasksFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
