import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmIconNumberSponsorFilterComponent } from './dm-icon-number-sponsor-filter.component';

describe('DmIconNumberSponsorFilterComponent', () => {
  let component: DmIconNumberSponsorFilterComponent;
  let fixture: ComponentFixture<DmIconNumberSponsorFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmIconNumberSponsorFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmIconNumberSponsorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
