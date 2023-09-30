import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsInstTaskViewShellComponent } from './study-cds-inst-task-view-shell.component';

describe('StudyCdsInstTaskViewShellComponent', () => {
  let component: StudyCdsInstTaskViewShellComponent;
  let fixture: ComponentFixture<StudyCdsInstTaskViewShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsInstTaskViewShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsInstTaskViewShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
