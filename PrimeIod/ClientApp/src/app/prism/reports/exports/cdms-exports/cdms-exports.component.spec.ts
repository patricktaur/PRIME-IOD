import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsExportsComponent } from './cdms-exports.component';

describe('CdmsExportsComponent', () => {
  let component: CdmsExportsComponent;
  let fixture: ComponentFixture<CdmsExportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsExportsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
