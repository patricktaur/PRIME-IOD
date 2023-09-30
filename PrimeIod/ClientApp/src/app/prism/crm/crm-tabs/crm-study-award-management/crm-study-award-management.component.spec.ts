import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyAwardManagementComponent } from './crm-study-award-management.component';

describe('CrmStudyAwardManagementComponent', () => {
  let component: CrmStudyAwardManagementComponent;
  let fixture: ComponentFixture<CrmStudyAwardManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmStudyAwardManagementComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmStudyAwardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
