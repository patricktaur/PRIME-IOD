import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTimelineInterimLocksListComponent } from './study-timeline-interim-locks-list.component';

describe('StudyTimelineInterimLocksListComponent', () => {
  let component: StudyTimelineInterimLocksListComponent;
  let fixture: ComponentFixture<StudyTimelineInterimLocksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTimelineInterimLocksListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTimelineInterimLocksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
