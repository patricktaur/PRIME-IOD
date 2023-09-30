import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyLocalLabsComponent } from './study-local-labs.component';

describe('StudyLocalLabsComponent', () => {
  let component: StudyLocalLabsComponent;
  let fixture: ComponentFixture<StudyLocalLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyLocalLabsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyLocalLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
