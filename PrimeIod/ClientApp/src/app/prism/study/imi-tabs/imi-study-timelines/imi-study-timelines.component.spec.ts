import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyTimelinesComponent } from './imi-study-timelines.component';

describe('ImiStudyTimelinesComponent', () => {
  let component: ImiStudyTimelinesComponent;
  let fixture: ComponentFixture<ImiStudyTimelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyTimelinesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyTimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
