import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsCodingTaskViewComponent } from './tudy-cds-coding-task-view.component';

describe('TudyCdsCodingTaskViewComponent', () => {
  let component: StudyCdsCodingTaskViewComponent;
  let fixture: ComponentFixture<StudyCdsCodingTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsCodingTaskViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsCodingTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
