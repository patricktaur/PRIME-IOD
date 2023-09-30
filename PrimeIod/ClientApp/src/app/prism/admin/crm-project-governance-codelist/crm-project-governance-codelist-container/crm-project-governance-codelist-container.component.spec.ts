import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmProjectGovernaceCodelistContainerComponent } from './crm-project-governance-codelist-container.component';

describe('CrmProjectGovernaceCodelistContainerComponent', () => {
  let component: CrmProjectGovernaceCodelistContainerComponent;
  let fixture: ComponentFixture<CrmProjectGovernaceCodelistContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmProjectGovernaceCodelistContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmProjectGovernaceCodelistContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
