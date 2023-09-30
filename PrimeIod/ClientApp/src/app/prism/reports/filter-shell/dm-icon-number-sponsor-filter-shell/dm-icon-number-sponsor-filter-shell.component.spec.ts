import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmIconNumberSponsorFilterShellComponent } from './dm-icon-number-sponsor-filter-shell.component';

describe('DmIconNumberSponsorFilterShellComponent', () => {
  let component: DmIconNumberSponsorFilterShellComponent;
  let fixture: ComponentFixture<DmIconNumberSponsorFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmIconNumberSponsorFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmIconNumberSponsorFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
