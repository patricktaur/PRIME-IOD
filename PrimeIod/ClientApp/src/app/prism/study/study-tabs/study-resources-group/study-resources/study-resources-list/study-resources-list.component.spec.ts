import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyResourcesListComponent } from './study-resources-list.component';

describe('StudyResourcesListComponent', () => {
  let component: StudyResourcesListComponent;
  let fixture: ComponentFixture<StudyResourcesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyResourcesListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyResourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
