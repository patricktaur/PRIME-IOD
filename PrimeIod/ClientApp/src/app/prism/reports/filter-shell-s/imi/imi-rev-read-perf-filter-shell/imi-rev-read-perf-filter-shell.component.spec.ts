import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRevReadPerfFilterShellComponent } from './imi-rev-read-perf-filter-shell.component';

describe('ImiRevReadPerfFilterShellComponent', () => {
  let component: ImiRevReadPerfFilterShellComponent;
  let fixture: ComponentFixture<ImiRevReadPerfFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRevReadPerfFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRevReadPerfFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
