import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCdsDashboardsComponent } from './home-cds-dashboards.component';

describe('HomeCdsDashboardsComponent', () => {
  let component: HomeCdsDashboardsComponent;
  let fixture: ComponentFixture<HomeCdsDashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeCdsDashboardsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCdsDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
