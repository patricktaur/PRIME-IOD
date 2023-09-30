import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDetailsLogFilterComponent } from './login-details-log-filter.component';

describe('LoginDetailsLogFilterComponent', () => {
  let component: LoginDetailsLogFilterComponent;
  let fixture: ComponentFixture<LoginDetailsLogFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginDetailsLogFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDetailsLogFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
