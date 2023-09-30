import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTasksContainerComponent } from './study-tasks-container.component';

describe('StudyTasksContainerComponent', () => {
  let component: StudyTasksContainerComponent;
  let fixture: ComponentFixture<StudyTasksContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTasksContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTasksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
