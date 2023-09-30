import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyOtherIconDepartmentsViewComponent } from './study-other-icon-departments-view.component';

describe('StudyOtherIconDepartmentsViewComponent', () => {
  let component: StudyOtherIconDepartmentsViewComponent;
  let fixture: ComponentFixture<StudyOtherIconDepartmentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyOtherIconDepartmentsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyOtherIconDepartmentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
