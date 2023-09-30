import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyRequestRequestListComponent } from './imi-study-request-request-list.component';

describe('ImiStudyRequestRequestListComponent', () => {
  let component: ImiStudyRequestRequestListComponent;
  let fixture: ComponentFixture<ImiStudyRequestRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyRequestRequestListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyRequestRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
