import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBudgetListComponent } from './crm-budget-list.component';

describe('CrmBudgetListComponent', () => {
  let component: CrmBudgetListComponent;
  let fixture: ComponentFixture<CrmBudgetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmBudgetListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmBudgetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
