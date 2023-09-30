import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyAssumptionsViewComponent } from './imi-study-assumptions-view.component';

describe('ImiStudyAssumptionsViewComponent', () => {
  let component: ImiStudyAssumptionsViewComponent;
  let fixture: ComponentFixture<ImiStudyAssumptionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiStudyAssumptionsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiStudyAssumptionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
