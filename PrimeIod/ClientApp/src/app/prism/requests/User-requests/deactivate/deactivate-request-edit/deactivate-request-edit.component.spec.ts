import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateRequestEditComponent } from './deactivate-request-edit.component';

describe('DeactivateRequestEditComponent', () => {
  let component: DeactivateRequestEditComponent;
  let fixture: ComponentFixture<DeactivateRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeactivateRequestEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
