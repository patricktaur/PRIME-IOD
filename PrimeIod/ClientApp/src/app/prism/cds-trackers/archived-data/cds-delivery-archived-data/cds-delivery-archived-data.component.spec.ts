import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsDeliveryArchivedDataComponent } from './cds-delivery-archived-data.component';

describe('CdsDeliveryArchivedDataComponent', () => {
  let component: CdsDeliveryArchivedDataComponent;
  let fixture: ComponentFixture<CdsDeliveryArchivedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdsDeliveryArchivedDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdsDeliveryArchivedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
