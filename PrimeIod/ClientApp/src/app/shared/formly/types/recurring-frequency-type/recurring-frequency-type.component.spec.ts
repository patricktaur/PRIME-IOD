import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringFrequencyTypeComponent } from './recurring-frequency-type.component';

describe('RecurringFrequencyTypeComponent', () => {
  let component: RecurringFrequencyTypeComponent;
  let fixture: ComponentFixture<RecurringFrequencyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecurringFrequencyTypeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringFrequencyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
