import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyStartupComponent } from './study-startup.component';

describe('StudyStartupComponent', () => {
  let component: StudyStartupComponent;
  let fixture: ComponentFixture<StudyStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyStartupComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
