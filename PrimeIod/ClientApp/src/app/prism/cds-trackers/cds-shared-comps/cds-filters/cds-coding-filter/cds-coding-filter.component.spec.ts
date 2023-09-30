import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsCodingFilterComponent } from './cds-coding-filter.component';

describe('CdsCodingFilterComponent', () => {
  let component: CdsCodingFilterComponent;
  let fixture: ComponentFixture<CdsCodingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsCodingFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsCodingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
