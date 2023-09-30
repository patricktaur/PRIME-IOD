import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClininfoCdmsAndCdmsTypeListComponent } from './clininfo-cdms-and-cdms-type-list.component';

describe('ClininfoCdmsAndCdmsTypeListComponent', () => {
  let component: ClininfoCdmsAndCdmsTypeListComponent;
  let fixture: ComponentFixture<ClininfoCdmsAndCdmsTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClininfoCdmsAndCdmsTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClininfoCdmsAndCdmsTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
