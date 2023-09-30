import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTasksListViewComponent } from './study-tasks-list-view.component';

describe('StudyTasksListViewComponent', () => {
  let component: StudyTasksListViewComponent;
  let fixture: ComponentFixture<StudyTasksListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyTasksListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyTasksListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
