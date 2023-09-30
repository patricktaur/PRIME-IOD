import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySftpUserAccessReviewContainerComponent } from './study-sftp-user-access-review-container.component';

describe('StudySftpUserAccessReviewContainerComponent', () => {
  let component: StudySftpUserAccessReviewContainerComponent;
  let fixture: ComponentFixture<StudySftpUserAccessReviewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudySftpUserAccessReviewContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudySftpUserAccessReviewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
