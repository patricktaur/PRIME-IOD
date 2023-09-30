import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsOutputDueDashboardComponent } from './cds-output-due-dashboard.component';

describe('CdsOutputDueDashboardComponent', () => {
  let component: CdsOutputDueDashboardComponent;
  let fixture: ComponentFixture<CdsOutputDueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsOutputDueDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsOutputDueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
