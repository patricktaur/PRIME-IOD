import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiMenuComponent } from './imi-menu.component';

describe('ImiMenuComponent', () => {
  let component: ImiMenuComponent;
  let fixture: ComponentFixture<ImiMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
