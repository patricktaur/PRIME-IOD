import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionImiFilterComponent } from './region-imi-filter.component';

describe('RegionImiFilterComponent', () => {
  let component: RegionImiFilterComponent;
  let fixture: ComponentFixture<RegionImiFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegionImiFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionImiFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
