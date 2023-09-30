import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySftpUserAccessReviewEditComponent } from './study-sftp-user-access-review-edit.component';

describe('StudySftpUserAccessReviewEditComponent', () => {
  let component: StudySftpUserAccessReviewEditComponent;
  let fixture: ComponentFixture<StudySftpUserAccessReviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudySftpUserAccessReviewEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudySftpUserAccessReviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
