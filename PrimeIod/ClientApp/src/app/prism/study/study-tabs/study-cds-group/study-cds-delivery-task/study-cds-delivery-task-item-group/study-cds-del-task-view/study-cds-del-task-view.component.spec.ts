import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsDelTaskViewComponent } from './study-cds-del-task-view.component';

describe('StudyCdsDelTaskViewComponent', () => {
  let component: StudyCdsDelTaskViewComponent;
  let fixture: ComponentFixture<StudyCdsDelTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsDelTaskViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsDelTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
