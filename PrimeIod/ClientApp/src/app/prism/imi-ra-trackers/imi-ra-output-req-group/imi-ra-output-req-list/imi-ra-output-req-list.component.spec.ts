import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaOutputReqListComponent } from './imi-ra-output-req-list.component';

describe('ImiRaOutputReqListComponent', () => {
  let component: ImiRaOutputReqListComponent;
  let fixture: ComponentFixture<ImiRaOutputReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaOutputReqListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaOutputReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
