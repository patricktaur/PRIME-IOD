import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmStudyOwnerListFilterShellComponent } from './dm-study-owner-list-filter.component';

describe('DmStudyOwnerListFilterComponent', () => {
  let component: DmStudyOwnerListFilterShellComponent;
  let fixture: ComponentFixture<DmStudyOwnerListFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmStudyOwnerListFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmStudyOwnerListFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
