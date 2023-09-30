import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsTaskGrpFilterShellComponent } from './imi-cdms-task-grp-filter-shell.component';

describe('ImiCdmsTaskGrpFilterShellComponent', () => {
  let component: ImiCdmsTaskGrpFilterShellComponent;
  let fixture: ComponentFixture<ImiCdmsTaskGrpFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsTaskGrpFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsTaskGrpFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
