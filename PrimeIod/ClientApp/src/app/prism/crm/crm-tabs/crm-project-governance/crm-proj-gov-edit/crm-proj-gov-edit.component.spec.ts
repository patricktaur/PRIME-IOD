import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmProjGovEditComponent } from './crm-proj-gov-edit.component';

describe('CrmProjGovEditComponent', () => {
  let component: CrmProjGovEditComponent;
  let fixture: ComponentFixture<CrmProjGovEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmProjGovEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmProjGovEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
