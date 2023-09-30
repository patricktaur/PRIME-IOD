import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsDevReqDashboardComponent } from './cds-dev-req-dashboard.component';

describe('CdsDevReqDashboardComponent', () => {
  let component: CdsDevReqDashboardComponent;
  let fixture: ComponentFixture<CdsDevReqDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsDevReqDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsDevReqDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
