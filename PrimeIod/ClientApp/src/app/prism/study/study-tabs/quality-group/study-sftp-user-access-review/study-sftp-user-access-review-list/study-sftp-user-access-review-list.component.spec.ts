import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySftpUserAccessReviewListComponent } from './study-sftp-user-access-review-list.component';

describe('StudySftpUserAccessReviewListComponent', () => {
  let component: StudySftpUserAccessReviewListComponent;
  let fixture: ComponentFixture<StudySftpUserAccessReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudySftpUserAccessReviewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudySftpUserAccessReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
