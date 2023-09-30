import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsDevReqDashboardListComponent } from './cds-dev-req-dashboard-list.component';

describe('CdsDevReqDashboardListComponent', () => {
  let component: CdsDevReqDashboardListComponent;
  let fixture: ComponentFixture<CdsDevReqDashboardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsDevReqDashboardListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsDevReqDashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
