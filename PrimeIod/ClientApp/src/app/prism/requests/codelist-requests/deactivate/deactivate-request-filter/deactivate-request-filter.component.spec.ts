import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateRequestFilterComponent } from './deactivate-request-filter.component';

describe('DeactivateRequestFilterComponent', () => {
  let component: DeactivateRequestFilterComponent;
  let fixture: ComponentFixture<DeactivateRequestFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeactivateRequestFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateRequestFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
