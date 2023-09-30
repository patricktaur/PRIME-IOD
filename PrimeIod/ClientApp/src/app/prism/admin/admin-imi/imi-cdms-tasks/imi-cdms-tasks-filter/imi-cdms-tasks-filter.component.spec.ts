import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiCdmsTasksFilterComponent } from './imi-cdms-tasks-filter.component';

describe('ImiCdmsTasksFilterComponent', () => {
  let component: ImiCdmsTasksFilterComponent;
  let fixture: ComponentFixture<ImiCdmsTasksFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiCdmsTasksFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiCdmsTasksFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
