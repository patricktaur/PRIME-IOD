import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClininfoCdmsTasksListComponent } from './clininfo-cdms-tasks-list.component';

describe('ClininfoCdmsTasksListComponent', () => {
  let component: ClininfoCdmsTasksListComponent;
  let fixture: ComponentFixture<ClininfoCdmsTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClininfoCdmsTasksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClininfoCdmsTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
