import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmProjectGovernanceCodelistFilterComponent } from './crm-project-governance-codelist-filter.component';

describe('CrmProjectGovernanceCodelistFilterComponent', () => {
  let component: CrmProjectGovernanceCodelistFilterComponent;
  let fixture: ComponentFixture<CrmProjectGovernanceCodelistFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmProjectGovernanceCodelistFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmProjectGovernanceCodelistFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
