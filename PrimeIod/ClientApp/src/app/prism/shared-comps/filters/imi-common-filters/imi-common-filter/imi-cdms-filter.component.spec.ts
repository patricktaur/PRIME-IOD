import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsFilterComponent } from './imi-cdms-filter.component';

describe('ImiCommonFilterComponent', () => {
  let component: ImiCdmsFilterComponent;
  let fixture: ComponentFixture<ImiCdmsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
