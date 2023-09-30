import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyOtherIconDepartmentsComponent } from './study-other-icon-departments.component';

describe('StudyOtherIconDepartmentsComponent', () => {
  let component: StudyOtherIconDepartmentsComponent;
  let fixture: ComponentFixture<StudyOtherIconDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyOtherIconDepartmentsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyOtherIconDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
