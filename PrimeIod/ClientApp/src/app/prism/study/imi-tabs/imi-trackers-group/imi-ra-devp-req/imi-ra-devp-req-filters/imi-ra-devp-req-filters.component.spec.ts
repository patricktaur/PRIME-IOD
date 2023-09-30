import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaDevpReqFiltersComponent } from './imi-ra-devp-req-filters.component';

describe('ImiRaDevpReqFiltersComponent', () => {
  let component: ImiRaDevpReqFiltersComponent;
  let fixture: ComponentFixture<ImiRaDevpReqFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaDevpReqFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaDevpReqFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
