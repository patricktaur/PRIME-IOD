import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTimelineContainerComponent } from './study-timeline-container.component';

describe('StudyTimelineContainerComponent', () => {
  let component: StudyTimelineContainerComponent;
  let fixture: ComponentFixture<StudyTimelineContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTimelineContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTimelineContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
