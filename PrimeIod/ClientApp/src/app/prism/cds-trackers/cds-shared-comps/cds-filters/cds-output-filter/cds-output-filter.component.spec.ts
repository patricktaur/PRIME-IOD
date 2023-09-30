import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsOutputFilterComponent } from './cds-output-filter.component';

describe('CdsOutputFilterComponent', () => {
  let component: CdsOutputFilterComponent;
  let fixture: ComponentFixture<CdsOutputFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsOutputFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsOutputFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
