import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCodelistFilterComponent } from './crm-codelist-filter.component';

describe('CrmCodelistFilterComponent', () => {
  let component: CrmCodelistFilterComponent;
  let fixture: ComponentFixture<CrmCodelistFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmCodelistFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmCodelistFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
