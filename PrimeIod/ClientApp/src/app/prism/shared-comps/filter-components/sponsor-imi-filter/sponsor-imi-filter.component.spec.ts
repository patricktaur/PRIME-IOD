import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorImiFilterComponent } from './sponsor-imi-filter.component';

describe('SponsorImiFilterComponent', () => {
  let component: SponsorImiFilterComponent;
  let fixture: ComponentFixture<SponsorImiFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SponsorImiFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorImiFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
