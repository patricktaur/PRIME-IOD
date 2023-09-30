import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaReqListComponent } from './imi-ra-devp-req-list.component';

describe('ImiRaReqListComponent', () => {
  let component: ImiRaReqListComponent;
  let fixture: ComponentFixture<ImiRaReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaReqListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
