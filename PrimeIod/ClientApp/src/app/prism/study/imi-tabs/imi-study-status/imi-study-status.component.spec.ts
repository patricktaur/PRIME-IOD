import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyStatusComponent } from './imi-study-status.component';

describe('ImiStudyStatusComponent', () => {
  let component: ImiStudyStatusComponent;
  let fixture: ComponentFixture<ImiStudyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyStatusComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
