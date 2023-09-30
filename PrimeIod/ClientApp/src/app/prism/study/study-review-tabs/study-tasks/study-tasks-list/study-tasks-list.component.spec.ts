import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTasksListComponent } from './study-tasks-list.component';

describe('StudyTasksListComponent', () => {
  let component: StudyTasksListComponent;
  let fixture: ComponentFixture<StudyTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTasksListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
