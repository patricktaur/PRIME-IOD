import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationShellComponent } from './confirmation-shell.component';

describe('ConfirmationShellComponent', () => {
  let component: ConfirmationShellComponent;
  let fixture: ComponentFixture<ConfirmationShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
