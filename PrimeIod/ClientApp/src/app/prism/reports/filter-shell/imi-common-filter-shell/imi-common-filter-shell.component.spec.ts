import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsFilterShellComponent } from './imi-common-filter-shell.component';

describe('ImiCommonFilterShellComponent', () => {
  let component: ImiCdmsFilterShellComponent;
  let fixture: ComponentFixture<ImiCdmsFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
