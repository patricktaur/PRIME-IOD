import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilesStonesTimelinesComponent } from './miles-stones-timelines.component';

describe('MilesStonesTimelinesComponent', () => {
  let component: MilesStonesTimelinesComponent;
  let fixture: ComponentFixture<MilesStonesTimelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MilesStonesTimelinesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilesStonesTimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
