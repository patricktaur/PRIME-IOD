import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyResourcesEditComponent } from './study-resources-edit.component';

describe('StudyResourcesEditComponent', () => {
  let component: StudyResourcesEditComponent;
  let fixture: ComponentFixture<StudyResourcesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyResourcesEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyResourcesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
