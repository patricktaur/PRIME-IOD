import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsDevFilterShellComponent } from './cds-dev-filter-shell.component';

describe('CdsDevFilterShellComponent', () => {
  let component: CdsDevFilterShellComponent;
  let fixture: ComponentFixture<CdsDevFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsDevFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsDevFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
