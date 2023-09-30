import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyLocalLabsViewComponent } from './study-local-labs-view.component';

describe('StudyLocalLabsViewComponent', () => {
  let component: StudyLocalLabsViewComponent;
  let fixture: ComponentFixture<StudyLocalLabsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyLocalLabsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyLocalLabsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
