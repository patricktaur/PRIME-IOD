import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyAssumptionsComponent } from './imi-study-assumptions.component';

describe('ImiStudyAssumptionsComponent', () => {
  let component: ImiStudyAssumptionsComponent;
  let fixture: ComponentFixture<ImiStudyAssumptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyAssumptionsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyAssumptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
