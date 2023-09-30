import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmIconNumberFilterShellComponent } from './dm-icon-number-filter-shell.component';

describe('DmIconNumberFilterShellComponent', () => {
  let component: DmIconNumberFilterShellComponent;
  let fixture: ComponentFixture<DmIconNumberFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmIconNumberFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmIconNumberFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
