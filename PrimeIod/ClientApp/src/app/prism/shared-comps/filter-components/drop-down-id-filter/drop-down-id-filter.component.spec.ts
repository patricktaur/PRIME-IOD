import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownIdFilterComponent } from './drop-down-id-filter.component';

describe('DropDownIdFilterComponent', () => {
  let component: DropDownIdFilterComponent;
  let fixture: ComponentFixture<DropDownIdFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropDownIdFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownIdFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
