import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBudgetContainerComponent } from './crm-budget-container.component';

describe('CrmBudgetContainerComponent', () => {
  let component: CrmBudgetContainerComponent;
  let fixture: ComponentFixture<CrmBudgetContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmBudgetContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmBudgetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
