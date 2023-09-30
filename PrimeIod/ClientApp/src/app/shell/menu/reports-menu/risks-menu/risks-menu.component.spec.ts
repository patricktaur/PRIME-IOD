import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisksMenuComponent } from './risks-menu.component';

describe('RisksMenuComponent', () => {
  let component: RisksMenuComponent;
  let fixture: ComponentFixture<RisksMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RisksMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RisksMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
