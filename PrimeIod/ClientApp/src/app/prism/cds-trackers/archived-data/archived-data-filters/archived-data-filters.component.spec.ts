import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedDataFiltersComponent } from './archived-data-filters.component';

describe('ArchivedDataFiltersComponent', () => {
  let component: ArchivedDataFiltersComponent;
  let fixture: ComponentFixture<ArchivedDataFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedDataFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedDataFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
