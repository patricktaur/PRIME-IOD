import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaDevpReqEditComponent } from './imi-ra-devp-req-edit.component';

describe('ImiRaDevpReqEditComponent', () => {
  let component: ImiRaDevpReqEditComponent;
  let fixture: ComponentFixture<ImiRaDevpReqEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaDevpReqEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaDevpReqEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
