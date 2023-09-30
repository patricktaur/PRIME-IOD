import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringFrequencyComponent } from './recurring-frequency.component';

describe('RecurringFrequencyComponent', () => {
  let component: RecurringFrequencyComponent;
  let fixture: ComponentFixture<RecurringFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecurringFrequencyComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
