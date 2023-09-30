import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaOutputReqFiltersComponent } from './imi-ra-output-req-filters.component';

describe('ImiRaOutputReqFiltersComponent', () => {
  let component: ImiRaOutputReqFiltersComponent;
  let fixture: ComponentFixture<ImiRaOutputReqFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaOutputReqFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaOutputReqFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
