import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBudgetFilterComponent } from './crm-budget-filter.component';

describe('CrmBudgetFilterComponent', () => {
  let component: CrmBudgetFilterComponent;
  let fixture: ComponentFixture<CrmBudgetFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmBudgetFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmBudgetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
