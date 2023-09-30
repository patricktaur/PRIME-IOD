import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDetailsLogEditComponent } from './login-details-log-edit.component';

describe('LoginDetailsLogEditComponent', () => {
  let component: LoginDetailsLogEditComponent;
  let fixture: ComponentFixture<LoginDetailsLogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginDetailsLogEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDetailsLogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
