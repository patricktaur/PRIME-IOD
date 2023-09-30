import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiDmCdmsFilterShellComponent } from './imi-dm-cdms-filter-shell.component';

describe('ImiDmCdmsFilterShellComponent', () => {
  let component: ImiDmCdmsFilterShellComponent;
  let fixture: ComponentFixture<ImiDmCdmsFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiDmCdmsFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiDmCdmsFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
