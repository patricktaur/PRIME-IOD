import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiDmCdmsFiltersComponent } from './imi-dm-cdms-filters.component';

describe('ImiDmCdmsFiltersComponent', () => {
  let component: ImiDmCdmsFiltersComponent;
  let fixture: ComponentFixture<ImiDmCdmsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiDmCdmsFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiDmCdmsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
