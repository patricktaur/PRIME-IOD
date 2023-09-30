import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyFilterShellComponent } from './study-filter-shell.component';

describe('StudyFilterShellComponent', () => {
  let component: StudyFilterShellComponent;
  let fixture: ComponentFixture<StudyFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
