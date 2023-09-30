import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsOutputTaskViewComponent } from './study-cds-output-task-view.component';

describe('StudyCdsOutputTaskViewComponent', () => {
  let component: StudyCdsOutputTaskViewComponent;
  let fixture: ComponentFixture<StudyCdsOutputTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsOutputTaskViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsOutputTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
