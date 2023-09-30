import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCodelistEditComponent } from './crm-codelist-edit.component';

describe('CrmCodelistEditComponent', () => {
  let component: CrmCodelistEditComponent;
  let fixture: ComponentFixture<CrmCodelistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmCodelistEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmCodelistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
