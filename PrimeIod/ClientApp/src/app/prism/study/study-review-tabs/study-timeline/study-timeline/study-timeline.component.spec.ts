import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTimelineComponent } from './study-timeline.component';

describe('StudyTimelineComponent', () => {
  let component: StudyTimelineComponent;
  let fixture: ComponentFixture<StudyTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTimelineComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
