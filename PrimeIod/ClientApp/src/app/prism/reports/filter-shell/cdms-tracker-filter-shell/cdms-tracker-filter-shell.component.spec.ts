import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsTrackerFilterShellComponent } from './cdms-tracker-filter-shell.component';

describe('CdmsTrackerFilterShellComponent', () => {
  let component: CdmsTrackerFilterShellComponent;
  let fixture: ComponentFixture<CdmsTrackerFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsTrackerFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsTrackerFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
