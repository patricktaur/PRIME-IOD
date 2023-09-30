import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmIconNumberFilterComponent } from './dm-icon-number-filter.component';

describe('DmIconNumberFilterComponent', () => {
  let component: DmIconNumberFilterComponent;
  let fixture: ComponentFixture<DmIconNumberFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmIconNumberFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmIconNumberFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
