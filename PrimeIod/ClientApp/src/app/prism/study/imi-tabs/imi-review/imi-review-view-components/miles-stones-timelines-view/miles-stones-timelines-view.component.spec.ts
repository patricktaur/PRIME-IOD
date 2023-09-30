import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilesStonesTimelinesViewComponent } from './miles-stones-timelines-view.component';

describe('MilesStonesTimelinesViewComponent', () => {
  let component: MilesStonesTimelinesViewComponent;
  let fixture: ComponentFixture<MilesStonesTimelinesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilesStonesTimelinesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilesStonesTimelinesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
