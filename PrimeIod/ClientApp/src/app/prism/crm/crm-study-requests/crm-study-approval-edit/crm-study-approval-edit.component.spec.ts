import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyApprovalEditComponent } from './crm-study-approval-edit.component';

describe('CrmStudyApprovalEditComponent', () => {
  let component: CrmStudyApprovalEditComponent;
  let fixture: ComponentFixture<CrmStudyApprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmStudyApprovalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmStudyApprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
