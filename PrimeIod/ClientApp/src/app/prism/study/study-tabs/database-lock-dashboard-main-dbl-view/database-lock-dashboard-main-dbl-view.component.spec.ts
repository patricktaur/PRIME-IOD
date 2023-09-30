import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseLockDashboardMainDblViewComponent } from './database-lock-dashboard-main-dbl-view.component';

describe('DatabaseLockDashboardMainDblViewComponent', () => {
  let component: DatabaseLockDashboardMainDblViewComponent;
  let fixture: ComponentFixture<DatabaseLockDashboardMainDblViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseLockDashboardMainDblViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseLockDashboardMainDblViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
