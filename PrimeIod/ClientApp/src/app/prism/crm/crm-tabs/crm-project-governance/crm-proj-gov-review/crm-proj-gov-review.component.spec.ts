import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmProjGovReviewComponent } from './crm-proj-gov-review.component';

describe('CrmProjGovReviewComponent', () => {
  let component: CrmProjGovReviewComponent;
  let fixture: ComponentFixture<CrmProjGovReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmProjGovReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmProjGovReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
