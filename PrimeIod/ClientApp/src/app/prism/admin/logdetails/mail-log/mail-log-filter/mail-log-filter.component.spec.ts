import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailLogFilterComponent } from './mail-log-filter.component';

describe('MailLogFilterComponent', () => {
  let component: MailLogFilterComponent;
  let fixture: ComponentFixture<MailLogFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailLogFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailLogFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
