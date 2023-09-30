import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmProjectGovernaceCodelistListComponent } from './crm-project-governance-codelist-list.component';

describe('CrmProjectGovernaceCodelistListComponent', () => {
  let component: CrmProjectGovernaceCodelistListComponent;
  let fixture: ComponentFixture<CrmProjectGovernaceCodelistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmProjectGovernaceCodelistListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmProjectGovernaceCodelistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
