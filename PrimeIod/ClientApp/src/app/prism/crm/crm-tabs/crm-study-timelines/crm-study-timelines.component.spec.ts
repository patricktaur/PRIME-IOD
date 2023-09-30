import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyTimelinesComponent } from './crm-study-timelines.component';

describe('CrmStudyTimelinesComponent', () => {
  let component: CrmStudyTimelinesComponent;
  let fixture: ComponentFixture<CrmStudyTimelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmStudyTimelinesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmStudyTimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
