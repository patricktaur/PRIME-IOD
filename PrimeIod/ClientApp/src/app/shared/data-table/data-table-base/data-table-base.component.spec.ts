import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableBaseComponent } from './data-table-base.component';

describe('DataTableBaseComponent', () => {
  let component: DataTableBaseComponent;
  let fixture: ComponentFixture<DataTableBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableBaseComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
