import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyRequestApprovalEditComponent } from './imi-study-request-approval-edit.component';

describe('ImiStudyRequestApprovalEditComponent', () => {
  let component: ImiStudyRequestApprovalEditComponent;
  let fixture: ComponentFixture<ImiStudyRequestApprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyRequestApprovalEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyRequestApprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
