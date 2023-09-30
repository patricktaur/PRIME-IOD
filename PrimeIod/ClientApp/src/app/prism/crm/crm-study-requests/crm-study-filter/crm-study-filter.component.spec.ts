import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyFilterComponent } from './crm-study-filter.component';

describe('CrmStudyFilterComponent', () => {
  let component: CrmStudyFilterComponent;
  let fixture: ComponentFixture<CrmStudyFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmStudyFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmStudyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
