import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyAnalysisPlanningComponent } from './crm-study-analysis-planning.component';

describe('CrmStudyAnalysisPlanningComponent', () => {
  let component: CrmStudyAnalysisPlanningComponent;
  let fixture: ComponentFixture<CrmStudyAnalysisPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmStudyAnalysisPlanningComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmStudyAnalysisPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
