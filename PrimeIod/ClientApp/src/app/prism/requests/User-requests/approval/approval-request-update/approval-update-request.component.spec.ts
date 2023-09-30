import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalUpdateRequestComponent } from './approval-update-request.component';

describe('ApprovalUpdateRequestComponent', () => {
  let component: ApprovalUpdateRequestComponent;
  let fixture: ComponentFixture<ApprovalUpdateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalUpdateRequestComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalUpdateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
