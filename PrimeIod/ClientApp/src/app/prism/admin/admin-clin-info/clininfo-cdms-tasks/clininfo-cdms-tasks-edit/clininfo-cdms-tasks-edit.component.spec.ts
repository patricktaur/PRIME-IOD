import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClininfoCdmsTasksEditComponent } from './clininfo-cdms-tasks-edit.component';

describe('ClininfoCdmsTasksEditComponent', () => {
  let component: ClininfoCdmsTasksEditComponent;
  let fixture: ComponentFixture<ClininfoCdmsTasksEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClininfoCdmsTasksEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClininfoCdmsTasksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
