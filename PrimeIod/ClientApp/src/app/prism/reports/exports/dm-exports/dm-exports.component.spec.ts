import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmExportsComponent } from './dm-exports.component';

describe('DmExportsComponent', () => {
  let component: DmExportsComponent;
  let fixture: ComponentFixture<DmExportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmExportsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
