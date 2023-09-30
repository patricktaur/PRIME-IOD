import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyRequestApprovalListComponent } from './study-request-approval-list.component';

describe('StudyRequestApprovalListComponent', () => {
  let component: StudyRequestApprovalListComponent;
  let fixture: ComponentFixture<StudyRequestApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyRequestApprovalListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyRequestApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
