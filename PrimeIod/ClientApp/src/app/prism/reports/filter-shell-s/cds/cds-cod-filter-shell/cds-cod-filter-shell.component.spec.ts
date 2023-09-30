import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsCodFilterShellComponent } from './cds-cod-filter-shell.component';

describe('CdsCodFilterShellComponent', () => {
  let component: CdsCodFilterShellComponent;
  let fixture: ComponentFixture<CdsCodFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsCodFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsCodFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
