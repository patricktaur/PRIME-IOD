import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsDelyFilterShellComponent } from './cds-dely-filter-shell.component';

describe('CdsDelyFilterShellComponent', () => {
  let component: CdsDelyFilterShellComponent;
  let fixture: ComponentFixture<CdsDelyFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsDelyFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsDelyFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
