import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsValidationFilterComponent } from './cds-validation-filter.component';

describe('CdsValidationFilterComponent', () => {
  let component: CdsValidationFilterComponent;
  let fixture: ComponentFixture<CdsValidationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsValidationFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsValidationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
