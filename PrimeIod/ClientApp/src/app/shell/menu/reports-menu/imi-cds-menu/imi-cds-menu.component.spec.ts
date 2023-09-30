import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdsMenuComponent } from './imi-cds-menu.component';

describe('ImiCdsMenuComponent', () => {
  let component: ImiCdsMenuComponent;
  let fixture: ComponentFixture<ImiCdsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdsMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
