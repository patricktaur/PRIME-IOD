import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTimelineInterimLocksContainerComponent } from './study-timeline-interim-locks-container.component';

describe('StudyTimelineInterimLocksContainerComponent', () => {
  let component: StudyTimelineInterimLocksContainerComponent;
  let fixture: ComponentFixture<StudyTimelineInterimLocksContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTimelineInterimLocksContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTimelineInterimLocksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
