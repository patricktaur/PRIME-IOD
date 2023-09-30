import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsValTaskViewComponent } from './study-cds-val-task-view.component';

describe('StudyCdsValTaskViewComponent', () => {
  let component: StudyCdsValTaskViewComponent;
  let fixture: ComponentFixture<StudyCdsValTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsValTaskViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsValTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
