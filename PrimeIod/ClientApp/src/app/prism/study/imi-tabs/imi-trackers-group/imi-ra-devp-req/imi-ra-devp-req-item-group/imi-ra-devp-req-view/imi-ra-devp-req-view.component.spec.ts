import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaDevpReqViewComponent } from './imi-ra-devp-req-view.component';

describe('ImiRaDevpReqViewComponent', () => {
  let component: ImiRaDevpReqViewComponent;
  let fixture: ComponentFixture<ImiRaDevpReqViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaDevpReqViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaDevpReqViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
