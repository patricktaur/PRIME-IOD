import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaDevReqFiltersShellComponent } from './imi-ra-dev-req-filters-shell.component';

describe('ImiRaDevReqFiltersShellComponent', () => {
  let component: ImiRaDevReqFiltersShellComponent;
  let fixture: ComponentFixture<ImiRaDevReqFiltersShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaDevReqFiltersShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaDevReqFiltersShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
