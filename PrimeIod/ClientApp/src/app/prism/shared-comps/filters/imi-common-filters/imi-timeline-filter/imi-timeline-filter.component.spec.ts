import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiTimelineFilterComponent } from './imi-timeline-filter.component';

describe('ImiTimelineFilterComponent', () => {
  let component: ImiTimelineFilterComponent;
  let fixture: ComponentFixture<ImiTimelineFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiTimelineFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiTimelineFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
