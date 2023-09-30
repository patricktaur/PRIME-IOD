import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskManagementViewComponent } from './risk-management-view.component';

describe('RiskManagementViewComponent', () => {
  let component: RiskManagementViewComponent;
  let fixture: ComponentFixture<RiskManagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskManagementViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
