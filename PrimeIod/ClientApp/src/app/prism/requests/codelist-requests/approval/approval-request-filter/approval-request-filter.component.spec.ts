import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalRequestFilterComponent } from './approval-request-filter.component';

describe('ApprovalRequestFilterComponent', () => {
  let component: ApprovalRequestFilterComponent;
  let fixture: ComponentFixture<ApprovalRequestFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalRequestFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalRequestFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
