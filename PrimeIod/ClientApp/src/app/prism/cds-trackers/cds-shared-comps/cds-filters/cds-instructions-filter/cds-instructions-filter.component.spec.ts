import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsInstructionsFilterComponent } from './cds-instructions-filter.component';

describe('CdsInstructionsFilterComponent', () => {
  let component: CdsInstructionsFilterComponent;
  let fixture: ComponentFixture<CdsInstructionsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsInstructionsFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsInstructionsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
