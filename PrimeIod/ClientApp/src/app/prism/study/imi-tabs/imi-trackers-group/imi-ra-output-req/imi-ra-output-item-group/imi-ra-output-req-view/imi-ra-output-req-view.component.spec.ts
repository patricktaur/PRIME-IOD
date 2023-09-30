import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaOutputReqViewComponent } from './imi-ra-output-req-view.component';

describe('ImiRaOutputReqViewComponent', () => {
  let component: ImiRaOutputReqViewComponent;
  let fixture: ComponentFixture<ImiRaOutputReqViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaOutputReqViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaOutputReqViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
