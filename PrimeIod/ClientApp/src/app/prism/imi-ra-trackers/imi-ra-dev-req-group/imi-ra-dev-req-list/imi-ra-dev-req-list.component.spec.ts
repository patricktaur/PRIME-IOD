import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaDevReqListComponent } from './imi-ra-dev-req-list.component';

describe('ImiRaDevReqListComponent', () => {
  let component: ImiRaDevReqListComponent;
  let fixture: ComponentFixture<ImiRaDevReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaDevReqListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaDevReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
