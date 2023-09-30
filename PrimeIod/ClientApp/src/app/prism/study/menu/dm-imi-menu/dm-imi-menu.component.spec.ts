import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmImiMenuComponent } from './dm-imi-menu.component';

describe('DmImiMenuComponent', () => {
  let component: DmImiMenuComponent;
  let fixture: ComponentFixture<DmImiMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmImiMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmImiMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
