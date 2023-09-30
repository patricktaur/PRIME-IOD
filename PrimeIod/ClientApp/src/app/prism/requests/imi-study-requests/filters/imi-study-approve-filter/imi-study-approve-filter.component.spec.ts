import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyApproveFilterComponent } from './imi-study-approve-filter.component';

describe('ImiStudyApproveFilterComponent', () => {
  let component: ImiStudyApproveFilterComponent;
  let fixture: ComponentFixture<ImiStudyApproveFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyApproveFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyApproveFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
