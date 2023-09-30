import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsInstFilterShellComponent } from './cds-inst-filter-shell.component';

describe('CdsInstFilterShellComponent', () => {
  let component: CdsInstFilterShellComponent;
  let fixture: ComponentFixture<CdsInstFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsInstFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsInstFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
