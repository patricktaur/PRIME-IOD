import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmProjectGovernanceContainerComponent } from './crm-project-governance-container.component';

describe('CrmProjectGovernanceContainerComponent', () => {
  let component: CrmProjectGovernanceContainerComponent;
  let fixture: ComponentFixture<CrmProjectGovernanceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmProjectGovernanceContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmProjectGovernanceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
