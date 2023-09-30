import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTasksListComponent } from './cdms-tasks-list.component';

describe('CdmsTasksListComponent', () => {
  let component: CdmsTasksListComponent;
  let fixture: ComponentFixture<CdmsTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTasksListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
