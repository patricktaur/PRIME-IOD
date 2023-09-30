import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTimelineInterimLocksEditComponent } from './study-timeline-interim-locks-edit.component';

describe('StudyTimelineInterimLocksEditComponent', () => {
  let component: StudyTimelineInterimLocksEditComponent;
  let fixture: ComponentFixture<StudyTimelineInterimLocksEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTimelineInterimLocksEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTimelineInterimLocksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
