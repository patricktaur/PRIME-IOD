import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmProjGovViewComponent } from './crm-proj-gov-view.component';

describe('CrmProjGovViewComponent', () => {
  let component: CrmProjGovViewComponent;
  let fixture: ComponentFixture<CrmProjGovViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmProjGovViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmProjGovViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
