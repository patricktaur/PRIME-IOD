import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyTimelinesViewComponent } from './crm-study-timelines-view.component';

describe('CrmStudyTimelinesViewComponent', () => {
  let component: CrmStudyTimelinesViewComponent;
  let fixture: ComponentFixture<CrmStudyTimelinesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmStudyTimelinesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmStudyTimelinesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
