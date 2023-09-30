import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiExportsComponent } from './imi-exports.component';

describe('ImiExportsComponent', () => {
  let component: ImiExportsComponent;
  let fixture: ComponentFixture<ImiExportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiExportsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
