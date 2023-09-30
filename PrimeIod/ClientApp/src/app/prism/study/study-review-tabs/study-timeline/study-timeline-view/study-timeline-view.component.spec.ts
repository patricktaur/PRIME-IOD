import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTimelineViewComponent } from './study-timeline-view.component';

describe('StudyTimelineViewComponent', () => {
  let component: StudyTimelineViewComponent;
  let fixture: ComponentFixture<StudyTimelineViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyTimelineViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyTimelineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
