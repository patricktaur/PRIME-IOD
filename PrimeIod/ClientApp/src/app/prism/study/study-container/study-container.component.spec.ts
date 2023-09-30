import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyContainerComponent } from './study-container.component';

describe('StudyContainerComponent', () => {
  let component: StudyContainerComponent;
  let fixture: ComponentFixture<StudyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
