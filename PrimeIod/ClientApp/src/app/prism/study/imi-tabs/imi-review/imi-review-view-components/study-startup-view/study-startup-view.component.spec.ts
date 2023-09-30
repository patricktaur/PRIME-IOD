import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyStartupViewComponent } from './study-startup-view.component';

describe('StudyStartupViewComponent', () => {
  let component: StudyStartupViewComponent;
  let fixture: ComponentFixture<StudyStartupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyStartupViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyStartupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
