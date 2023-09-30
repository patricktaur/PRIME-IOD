import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClininfoCdmsAndCdmsTypeEditComponent } from './clininfo-cdms-and-cdms-type-edit.component';

describe('ClininfoCdmsAndCdmsTypeEditComponent', () => {
  let component: ClininfoCdmsAndCdmsTypeEditComponent;
  let fixture: ComponentFixture<ClininfoCdmsAndCdmsTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClininfoCdmsAndCdmsTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClininfoCdmsAndCdmsTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
