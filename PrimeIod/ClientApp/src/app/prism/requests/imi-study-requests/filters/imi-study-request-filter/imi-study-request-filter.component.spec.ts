import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyRequestFilterComponent } from './imi-study-request-filter.component';

describe('ImiStudyRequestFilterComponent', () => {
  let component: ImiStudyRequestFilterComponent;
  let fixture: ComponentFixture<ImiStudyRequestFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyRequestFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyRequestFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
