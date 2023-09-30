import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyAnalysisPlanningViewComponent } from './crm-study-analysis-planning-view.component';

describe('CrmStudyAnalysisPlanningViewComponent', () => {
  let component: CrmStudyAnalysisPlanningViewComponent;
  let fixture: ComponentFixture<CrmStudyAnalysisPlanningViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmStudyAnalysisPlanningViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmStudyAnalysisPlanningViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
