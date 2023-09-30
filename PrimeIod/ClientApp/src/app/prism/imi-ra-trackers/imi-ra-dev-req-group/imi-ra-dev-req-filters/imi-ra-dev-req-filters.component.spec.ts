import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaDevReqFiltersComponent } from './imi-ra-dev-req-filters.component';

describe('ImiRaDevReqFiltersComponent', () => {
  let component: ImiRaDevReqFiltersComponent;
  let fixture: ComponentFixture<ImiRaDevReqFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaDevReqFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaDevReqFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
