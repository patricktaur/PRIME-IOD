import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyRequestApprovalEditComponent } from './study-request-approval-edit.component';

describe('StudyRequestApprovalEditComponent', () => {
  let component: StudyRequestApprovalEditComponent;
  let fixture: ComponentFixture<StudyRequestApprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyRequestApprovalEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyRequestApprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
