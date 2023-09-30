import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelgeneDeliverablesFilterComponent } from './celgene-deliverables-filter.component';

describe('CelgeneDeliverablesFilterComponent', () => {
  let component: CelgeneDeliverablesFilterComponent;
  let fixture: ComponentFixture<CelgeneDeliverablesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CelgeneDeliverablesFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CelgeneDeliverablesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
