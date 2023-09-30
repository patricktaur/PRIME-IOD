import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailLogListComponent } from './mail-log-list.component';

describe('MailLogListComponent', () => {
  let component: MailLogListComponent;
  let fixture: ComponentFixture<MailLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailLogListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
