import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyTimelinesViewComponent } from './imi-study-timelines-view.component';

describe('ImiStudyTimelinesViewComponent', () => {
  let component: ImiStudyTimelinesViewComponent;
  let fixture: ComponentFixture<ImiStudyTimelinesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiStudyTimelinesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiStudyTimelinesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
