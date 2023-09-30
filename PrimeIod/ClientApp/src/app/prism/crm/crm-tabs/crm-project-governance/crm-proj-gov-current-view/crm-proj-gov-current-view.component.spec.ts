import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmProjGovCurrentViewComponent } from './crm-proj-gov-current-view.component';

describe('CrmProjGovCurrentViewComponent', () => {
  let component: CrmProjGovCurrentViewComponent;
  let fixture: ComponentFixture<CrmProjGovCurrentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmProjGovCurrentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmProjGovCurrentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
