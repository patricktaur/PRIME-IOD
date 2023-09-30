import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAssumptionsViewComponent } from './study-assumptions-view.component';

describe('StudyAssumptionsViewComponent', () => {
  let component: StudyAssumptionsViewComponent;
  let fixture: ComponentFixture<StudyAssumptionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyAssumptionsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyAssumptionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
