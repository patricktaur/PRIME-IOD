import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsAndCdmsTypeFilterComponent } from './cdms-and-cdms-type-filter.component';

describe('CdmsAndCdmsTypeFilterComponent', () => {
  let component: CdmsAndCdmsTypeFilterComponent;
  let fixture: ComponentFixture<CdmsAndCdmsTypeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsAndCdmsTypeFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsAndCdmsTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
