import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceMenuComponent } from './compliance-menu.component';

describe('ComplianceMenuComponent', () => {
  let component: ComplianceMenuComponent;
  let fixture: ComponentFixture<ComplianceMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplianceMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
