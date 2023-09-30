import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmStudyOwnerListFilterComponent } from './dm-study-owner-list-filter.component';

describe('DmStudyOwnerListFilterComponent', () => {
  let component: DmStudyOwnerListFilterComponent;
  let fixture: ComponentFixture<DmStudyOwnerListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmStudyOwnerListFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmStudyOwnerListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
