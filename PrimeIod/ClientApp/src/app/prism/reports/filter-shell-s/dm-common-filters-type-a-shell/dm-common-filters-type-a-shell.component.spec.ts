import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCommonFiltersTypeAShellComponent } from './dm-common-filters-type-a-shell.component';

describe('DmCommonFiltersTypeAShellComponent', () => {
  let component: DmCommonFiltersTypeAShellComponent;
  let fixture: ComponentFixture<DmCommonFiltersTypeAShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmCommonFiltersTypeAShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCommonFiltersTypeAShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
