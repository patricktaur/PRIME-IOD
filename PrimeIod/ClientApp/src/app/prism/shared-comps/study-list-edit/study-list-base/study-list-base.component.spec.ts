import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyListBaseComponent } from './study-list-base.component';

describe('StudyListBaseComponent', () => {
  let component: StudyListBaseComponent;
  let fixture: ComponentFixture<StudyListBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyListBaseComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyListBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
