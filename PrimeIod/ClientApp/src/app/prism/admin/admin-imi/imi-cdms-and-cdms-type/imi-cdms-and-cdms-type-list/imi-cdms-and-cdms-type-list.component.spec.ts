import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsAndCdmsTypeListComponent } from './imi-cdms-and-cdms-type-list.component';

describe('ImiCdmsAndCdmsTypeListComponent', () => {
  let component: ImiCdmsAndCdmsTypeListComponent;
  let fixture: ComponentFixture<ImiCdmsAndCdmsTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsAndCdmsTypeListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsAndCdmsTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
