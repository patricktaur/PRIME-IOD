import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyRequestApproveFilterComponent } from './study-request-approve-filter.component';

describe('StudyRequestApproveFilterComponent', () => {
  let component: StudyRequestApproveFilterComponent;
  let fixture: ComponentFixture<StudyRequestApproveFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyRequestApproveFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyRequestApproveFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
