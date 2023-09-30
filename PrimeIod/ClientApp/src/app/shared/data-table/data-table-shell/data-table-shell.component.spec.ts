import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableShellComponent } from './data-table-shell.component';

describe('DataTableShellComponent', () => {
  let component: DataTableShellComponent;
  let fixture: ComponentFixture<DataTableShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
