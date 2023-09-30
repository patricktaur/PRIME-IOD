import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyAwardManagementViewComponent } from './crm-study-award-management-view.component';

describe('CrmStudyAwardManagementViewComponent', () => {
  let component: CrmStudyAwardManagementViewComponent;
  let fixture: ComponentFixture<CrmStudyAwardManagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmStudyAwardManagementViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmStudyAwardManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
