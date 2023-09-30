import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseLockDashboardMainDblComponent } from './database-lock-dashboard-main-dbl.component';

describe('DatabaseLockDashboardMainDblComponent', () => {
  let component: DatabaseLockDashboardMainDblComponent;
  let fixture: ComponentFixture<DatabaseLockDashboardMainDblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatabaseLockDashboardMainDblComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseLockDashboardMainDblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
