import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyRequestApprovalListComponent } from './imi-study-request-approval-list.component';

describe('ImiStudyRequestApprovalListComponent', () => {
  let component: ImiStudyRequestApprovalListComponent;
  let fixture: ComponentFixture<ImiStudyRequestApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyRequestApprovalListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyRequestApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
