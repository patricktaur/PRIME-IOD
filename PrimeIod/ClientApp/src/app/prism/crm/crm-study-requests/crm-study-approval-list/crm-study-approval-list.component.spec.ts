import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyApprovalListComponent } from './crm-study-approval-list.component';

describe('CrmStudyApprovalListComponent', () => {
  let component: CrmStudyApprovalListComponent;
  let fixture: ComponentFixture<CrmStudyApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmStudyApprovalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmStudyApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
