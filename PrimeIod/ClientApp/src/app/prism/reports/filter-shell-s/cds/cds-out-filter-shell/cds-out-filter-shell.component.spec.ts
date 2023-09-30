import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsOutFilterShellComponent } from './cds-out-filter-shell.component';

describe('CdsOutFilterShellComponent', () => {
  let component: CdsOutFilterShellComponent;
  let fixture: ComponentFixture<CdsOutFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsOutFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsOutFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
