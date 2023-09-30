import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnManagerComponent } from './column-manager.component';

describe('ColumnManagerComponent', () => {
  let component: ColumnManagerComponent;
  let fixture: ComponentFixture<ColumnManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnManagerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
