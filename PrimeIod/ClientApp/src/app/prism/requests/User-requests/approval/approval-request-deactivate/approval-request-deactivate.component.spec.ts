import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalRequestDeactivateComponent } from './approval-request-deactivate.component';

describe('ApprovalRequestDeactivateComponent', () => {
  let component: ApprovalRequestDeactivateComponent;
  let fixture: ComponentFixture<ApprovalRequestDeactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalRequestDeactivateComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalRequestDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
