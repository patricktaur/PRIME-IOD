import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyResourcesContainerComponent } from './study-resources-container.component';

describe('StudyResourcesContainerComponent', () => {
  let component: StudyResourcesContainerComponent;
  let fixture: ComponentFixture<StudyResourcesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyResourcesContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyResourcesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
