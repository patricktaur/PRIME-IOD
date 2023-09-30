import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNamePwdLoginComponent } from './user-name-pwd-login.component';

describe('UserNamePwdLoginComponent', () => {
  let component: UserNamePwdLoginComponent;
  let fixture: ComponentFixture<UserNamePwdLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserNamePwdLoginComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNamePwdLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
