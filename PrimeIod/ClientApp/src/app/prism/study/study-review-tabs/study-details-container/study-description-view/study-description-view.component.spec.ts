import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDescriptionViewComponent } from './study-description-view.component';

describe('VmStudyDescriptionComponent', () => {
  let component: StudyDescriptionViewComponent;
  let fixture: ComponentFixture<StudyDescriptionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyDescriptionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyDescriptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
