import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsValFilterShellComponent } from './cds-val-filter-shell.component';

describe('CdsValFilterShellComponent', () => {
  let component: CdsValFilterShellComponent;
  let fixture: ComponentFixture<CdsValFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsValFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsValFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
