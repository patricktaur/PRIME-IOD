import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBudgetEditComponent } from './crm-budget-edit.component';

describe('CrmBudgetEditComponent', () => {
  let component: CrmBudgetEditComponent;
  let fixture: ComponentFixture<CrmBudgetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmBudgetEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmBudgetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
