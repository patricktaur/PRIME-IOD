import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsInstSelectTaskComponent } from './study-cds-inst-select-task.component';

describe('StudyCdsInstSelectTaskComponent', () => {
  let component: StudyCdsInstSelectTaskComponent;
  let fixture: ComponentFixture<StudyCdsInstSelectTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsInstSelectTaskComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsInstSelectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
