import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsAndCdmsTypeEditComponent } from './imi-cdms-and-cdms-type-edit.component';

describe('ImiCdmsAndCdmsTypeEditComponent', () => {
  let component: ImiCdmsAndCdmsTypeEditComponent;
  let fixture: ComponentFixture<ImiCdmsAndCdmsTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsAndCdmsTypeEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsAndCdmsTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
