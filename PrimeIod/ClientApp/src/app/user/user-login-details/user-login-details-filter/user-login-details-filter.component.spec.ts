import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginDetailsFilterComponent } from './user-login-details-filter.component';

describe('UserLoginDetailsFilterComponent', () => {
  let component: UserLoginDetailsFilterComponent;
  let fixture: ComponentFixture<UserLoginDetailsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginDetailsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginDetailsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
