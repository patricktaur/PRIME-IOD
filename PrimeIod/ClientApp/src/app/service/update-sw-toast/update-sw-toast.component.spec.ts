import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSwToastComponent } from './update-sw-toast.component';

describe('UpdateSwToastComponent', () => {
  let component: UpdateSwToastComponent;
  let fixture: ComponentFixture<UpdateSwToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSwToastComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSwToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
