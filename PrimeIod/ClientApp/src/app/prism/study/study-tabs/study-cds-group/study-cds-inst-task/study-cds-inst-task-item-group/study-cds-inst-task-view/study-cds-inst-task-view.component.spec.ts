import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsInstTaskViewComponent } from './study-cds-inst-task-view.component';

describe('StudyCdsInstTaskViewComponent', () => {
  let component: StudyCdsInstTaskViewComponent;
  let fixture: ComponentFixture<StudyCdsInstTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsInstTaskViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsInstTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
