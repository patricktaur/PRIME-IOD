import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailLogEditComponent } from './mail-log-edit.component';

describe('MailLogEditComponent', () => {
  let component: MailLogEditComponent;
  let fixture: ComponentFixture<MailLogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailLogEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailLogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
