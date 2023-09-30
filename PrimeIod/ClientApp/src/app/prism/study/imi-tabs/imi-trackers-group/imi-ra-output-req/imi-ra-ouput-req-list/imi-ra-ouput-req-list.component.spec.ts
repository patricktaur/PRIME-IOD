import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaOuputReqListComponent } from './imi-ra-ouput-req-list.component';

describe('ImiRaOuputReqListComponent', () => {
  let component: ImiRaOuputReqListComponent;
  let fixture: ComponentFixture<ImiRaOuputReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaOuputReqListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaOuputReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
