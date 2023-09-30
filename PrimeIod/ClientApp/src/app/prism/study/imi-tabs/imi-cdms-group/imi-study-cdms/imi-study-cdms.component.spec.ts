import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyCdmsComponent } from './imi-study-cdms.component';

describe('ImiStudyCdmsComponent', () => {
  let component: ImiStudyCdmsComponent;
  let fixture: ComponentFixture<ImiStudyCdmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyCdmsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyCdmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
