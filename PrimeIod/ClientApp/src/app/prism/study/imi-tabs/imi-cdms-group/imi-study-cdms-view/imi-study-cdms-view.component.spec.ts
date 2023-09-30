import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyCdmsViewComponent } from './imi-study-cdms-view.component';

describe('ImiStudyCdmsViewComponent', () => {
  let component: ImiStudyCdmsViewComponent;
  let fixture: ComponentFixture<ImiStudyCdmsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiStudyCdmsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiStudyCdmsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
