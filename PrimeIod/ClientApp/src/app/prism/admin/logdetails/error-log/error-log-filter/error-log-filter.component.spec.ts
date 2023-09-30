import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLogFilterComponent } from './error-log-filter.component';

describe('ErrorLogFilterComponent', () => {
  let component: ErrorLogFilterComponent;
  let fixture: ComponentFixture<ErrorLogFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorLogFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLogFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
