import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmListFiltersComponent } from './crm-list-filters.component';

describe('CrmListFiltersComponent', () => {
  let component: CrmListFiltersComponent;
  let fixture: ComponentFixture<CrmListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmListFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
