import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyMenuComponent } from './study-menu.component';

describe('StudyMenuComponent', () => {
  let component: StudyMenuComponent;
  let fixture: ComponentFixture<StudyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
