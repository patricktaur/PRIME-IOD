import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelgeneDeliverablesFilterShellComponent } from './celgene-deliverables-filter-shell.component';

describe('CelgeneDeliverablesFilterShellComponent', () => {
  let component: CelgeneDeliverablesFilterShellComponent;
  let fixture: ComponentFixture<CelgeneDeliverablesFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CelgeneDeliverablesFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CelgeneDeliverablesFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
