import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyRequestRequestEditComponent } from './imi-study-request-request-edit.component';

describe('ImiStudyRequestRequestEditComponent', () => {
  let component: ImiStudyRequestRequestEditComponent;
  let fixture: ComponentFixture<ImiStudyRequestRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyRequestRequestEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyRequestRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
