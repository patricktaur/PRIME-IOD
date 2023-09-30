import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginDetailsComponent } from './user-login-details.component';

describe('UserLoginDetailsComponent', () => {
  let component: UserLoginDetailsComponent;
  let fixture: ComponentFixture<UserLoginDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
