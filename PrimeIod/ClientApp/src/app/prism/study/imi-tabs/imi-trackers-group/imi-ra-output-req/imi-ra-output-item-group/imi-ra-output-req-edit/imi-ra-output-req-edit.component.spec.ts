import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaOutputReqEditComponent } from './imi-ra-output-req-edit.component';

describe('ImiRaOutputReqEditComponent', () => {
  let component: ImiRaOutputReqEditComponent;
  let fixture: ComponentFixture<ImiRaOutputReqEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaOutputReqEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaOutputReqEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
