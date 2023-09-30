import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAssumptionsComponent } from './study-assumptions.component';

describe('StusyAssumptionsComponent', () => {
  let component: StudyAssumptionsComponent;
  let fixture: ComponentFixture<StudyAssumptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyAssumptionsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAssumptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
