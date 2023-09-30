import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionPortfolioDmpmCdmsFilterComponent } from './region-portfolio-dmpm-cdms-filter.component';

describe('RegionPortfolioDmpmCdmsFilterComponent', () => {
  let component: RegionPortfolioDmpmCdmsFilterComponent;
  let fixture: ComponentFixture<RegionPortfolioDmpmCdmsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegionPortfolioDmpmCdmsFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionPortfolioDmpmCdmsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
