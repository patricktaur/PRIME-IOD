import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTrGrpFilterShellComponent } from './cdms-tr-grp-filter-shell.component';

describe('CdmsTrGrpFilterShellComponent', () => {
  let component: CdmsTrGrpFilterShellComponent;
  let fixture: ComponentFixture<CdmsTrGrpFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTrGrpFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTrGrpFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
