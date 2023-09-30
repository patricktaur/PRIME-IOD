import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsDelyDueDashboardComponent } from './cds-dely-due-dashboard.component';

describe('CdsDelyDueDashboardComponent', () => {
  let component: CdsDelyDueDashboardComponent;
  let fixture: ComponentFixture<CdsDelyDueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsDelyDueDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsDelyDueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
