import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClininfoCdmsTasksFilterComponent } from './clininfo-cdms-tasks-filter.component';

describe('ClininfoCdmsTasksFilterComponent', () => {
  let component: ClininfoCdmsTasksFilterComponent;
  let fixture: ComponentFixture<ClininfoCdmsTasksFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClininfoCdmsTasksFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClininfoCdmsTasksFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
