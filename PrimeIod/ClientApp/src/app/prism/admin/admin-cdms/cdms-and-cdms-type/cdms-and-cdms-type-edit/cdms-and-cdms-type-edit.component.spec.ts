import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsAndCdmsTypeEditComponent } from './cdms-and-cdms-type-edit.component';

describe('CdmsAndCdmsTypeEditComponent', () => {
  let component: CdmsAndCdmsTypeEditComponent;
  let fixture: ComponentFixture<CdmsAndCdmsTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsAndCdmsTypeEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsAndCdmsTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
