import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsDeliveryFilterComponent } from './cds-delivery-filter.component';

describe('CdsDeliveryFilterComponent', () => {
  let component: CdsDeliveryFilterComponent;
  let fixture: ComponentFixture<CdsDeliveryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsDeliveryFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsDeliveryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
