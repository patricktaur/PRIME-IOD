import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPortDirCdmsDmpmFilterShellComponent } from './reg-port-dir-cdms-dmpm-filter-shell.component';

describe('RegPortDirCdmsDmpmFilterShellComponent', () => {
  let component: RegPortDirCdmsDmpmFilterShellComponent;
  let fixture: ComponentFixture<RegPortDirCdmsDmpmFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegPortDirCdmsDmpmFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPortDirCdmsDmpmFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
