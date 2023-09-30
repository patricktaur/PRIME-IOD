import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClininfoCdmsAndCdmsTypeFilterComponent } from './clininfo-cdms-and-cdms-type-filter.component';

describe('ClininfoCdmsAndCdmsTypeFilterComponent', () => {
  let component: ClininfoCdmsAndCdmsTypeFilterComponent;
  let fixture: ComponentFixture<ClininfoCdmsAndCdmsTypeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClininfoCdmsAndCdmsTypeFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClininfoCdmsAndCdmsTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
