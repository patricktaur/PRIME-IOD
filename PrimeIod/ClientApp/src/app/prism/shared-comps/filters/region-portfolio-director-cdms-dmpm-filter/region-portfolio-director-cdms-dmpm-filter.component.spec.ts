import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionPortfolioDirectorCdmsDmpmFilterComponent } from './region-portfolio-director-cdms-dmpm-filter.component';

describe('RegionPortfolioDirectorCdmsDmpmFilterComponent', () => {
  let component: RegionPortfolioDirectorCdmsDmpmFilterComponent;
  let fixture: ComponentFixture<RegionPortfolioDirectorCdmsDmpmFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegionPortfolioDirectorCdmsDmpmFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionPortfolioDirectorCdmsDmpmFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
