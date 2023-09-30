import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDetailsLogListComponent } from './login-details-log-list.component';

describe('LoginDetailsLogListComponent', () => {
  let component: LoginDetailsLogListComponent;
  let fixture: ComponentFixture<LoginDetailsLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginDetailsLogListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDetailsLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
