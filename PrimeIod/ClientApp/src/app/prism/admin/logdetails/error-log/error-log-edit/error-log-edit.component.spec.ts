import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLogEditComponent } from './error-log-edit.component';

describe('ErrorLogEditComponent', () => {
  let component: ErrorLogEditComponent;
  let fixture: ComponentFixture<ErrorLogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorLogEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
