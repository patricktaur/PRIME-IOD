import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmExportsComponent } from './crm-exports.component';

describe('CrmExportsComponent', () => {
  let component: CrmExportsComponent;
  let fixture: ComponentFixture<CrmExportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmExportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
