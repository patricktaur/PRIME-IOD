import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsExportsComponent } from './cds-exports.component';

describe('CdsExportsComponent', () => {
  let component: CdsExportsComponent;
  let fixture: ComponentFixture<CdsExportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsExportsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
