import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaOutReqFiltersShellComponent } from './imi-ra-out-req-filters-shell.component';

describe('ImiRaOutReqFiltersShellComponent', () => {
  let component: ImiRaOutReqFiltersShellComponent;
  let fixture: ComponentFixture<ImiRaOutReqFiltersShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaOutReqFiltersShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaOutReqFiltersShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
