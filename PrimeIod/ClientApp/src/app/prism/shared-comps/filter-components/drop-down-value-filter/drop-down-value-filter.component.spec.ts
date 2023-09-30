import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownValueFilterComponent } from './drop-down-value-filter.component';

describe('DropDownValueFilterComponent', () => {
  let component: DropDownValueFilterComponent;
  let fixture: ComponentFixture<DropDownValueFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropDownValueFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownValueFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
