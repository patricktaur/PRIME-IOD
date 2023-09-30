import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTokenLoginComponent } from './email-token-login.component';

describe('EmailTokenLoginComponent', () => {
  let component: EmailTokenLoginComponent;
  let fixture: ComponentFixture<EmailTokenLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailTokenLoginComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTokenLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
