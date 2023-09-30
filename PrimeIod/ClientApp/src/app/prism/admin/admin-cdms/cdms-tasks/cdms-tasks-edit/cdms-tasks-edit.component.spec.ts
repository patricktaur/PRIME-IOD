import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTasksEditComponent } from './cdms-tasks-edit.component';

describe('CdmsTasksEditComponent', () => {
  let component: CdmsTasksEditComponent;
  let fixture: ComponentFixture<CdmsTasksEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTasksEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTasksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
