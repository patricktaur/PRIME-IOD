import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiTimelineFilterShellComponent } from './imi-timeline-filter-shell.component';

describe('ImiTimelineFilterShellComponent', () => {
  let component: ImiTimelineFilterShellComponent;
  let fixture: ComponentFixture<ImiTimelineFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiTimelineFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiTimelineFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
