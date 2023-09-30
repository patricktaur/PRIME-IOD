import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalRequestEditComponent } from './approval-request-edit.component';

describe('ApprovalRequestEditComponent', () => {
  let component: ApprovalRequestEditComponent;
  let fixture: ComponentFixture<ApprovalRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalRequestEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
