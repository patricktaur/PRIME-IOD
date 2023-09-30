import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseLockDashboardFollowupDblComponent } from './database-lock-dashboard-followup-dbl.component';

describe('DatabaseLockDashboardFollowupDblComponent', () => {
  let component: DatabaseLockDashboardFollowupDblComponent;
  let fixture: ComponentFixture<DatabaseLockDashboardFollowupDblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatabaseLockDashboardFollowupDblComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseLockDashboardFollowupDblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
