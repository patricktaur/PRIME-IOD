import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDescriptionComponent } from './study-description.component';

describe('StudyDescriptionComponent', () => {
  let component: StudyDescriptionComponent;
  let fixture: ComponentFixture<StudyDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyDescriptionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
