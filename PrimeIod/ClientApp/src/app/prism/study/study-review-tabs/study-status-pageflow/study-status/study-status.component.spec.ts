import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyStatusComponent } from './study-status.component';

describe('StudyStatusComponent', () => {
  let component: StudyStatusComponent;
  let fixture: ComponentFixture<StudyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyStatusComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
