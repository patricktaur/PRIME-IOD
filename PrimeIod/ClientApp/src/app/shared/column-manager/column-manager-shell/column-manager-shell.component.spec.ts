import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnManagerShellComponent } from './column-manager-shell.component';

describe('ColumnManagerShellComponent', () => {
  let component: ColumnManagerShellComponent;
  let fixture: ComponentFixture<ColumnManagerShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnManagerShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnManagerShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
