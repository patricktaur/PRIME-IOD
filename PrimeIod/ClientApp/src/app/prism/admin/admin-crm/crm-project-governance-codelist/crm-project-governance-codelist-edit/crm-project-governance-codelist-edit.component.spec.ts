import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmProjectGovernaceCodelistEditComponent } from './crm-project-governance-codelist-edit.component';

describe('CrmProjectGovernaceCodelistEditComponent', () => {
  let component: CrmProjectGovernaceCodelistEditComponent;
  let fixture: ComponentFixture<CrmProjectGovernaceCodelistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmProjectGovernaceCodelistEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmProjectGovernaceCodelistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
