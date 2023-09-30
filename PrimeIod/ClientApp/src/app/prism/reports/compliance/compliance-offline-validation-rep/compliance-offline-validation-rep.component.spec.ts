import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceOfflineValidationRepComponent } from './compliance-offline-validation-rep.component';

describe('ComplianceOfflineValidationRepComponent', () => {
  let component: ComplianceOfflineValidationRepComponent;
  let fixture: ComponentFixture<ComplianceOfflineValidationRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplianceOfflineValidationRepComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceOfflineValidationRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
