import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyStatusViewComponent } from './study-status-view.component';

describe('StudyStatusViewComponent', () => {
  let component: StudyStatusViewComponent;
  let fixture: ComponentFixture<StudyStatusViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyStatusViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyStatusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
