import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyStatusAltViewComponent } from './study-status-alt-view.component';

describe('StudyStatusAltViewComponent', () => {
  let component: StudyStatusAltViewComponent;
  let fixture: ComponentFixture<StudyStatusAltViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyStatusAltViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyStatusAltViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
